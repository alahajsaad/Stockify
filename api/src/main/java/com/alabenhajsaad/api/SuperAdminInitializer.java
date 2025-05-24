package com.alabenhajsaad.api;

import com.alabenhajsaad.api.core.enums.Role;
import com.alabenhajsaad.api.core.user.AppUser;
import com.alabenhajsaad.api.core.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.io.Console;
import java.util.Arrays;
import java.util.Optional;
import java.util.Scanner;

@Component
@Profile("superadmin-init")
public class SuperAdminInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public SuperAdminInitializer(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        Optional<AppUser> existingAdmin = userRepository.findByRole(Role.SUPER_ADMIN).stream().findFirst();

        if (existingAdmin.isPresent()) {
            System.out.println("Un administrateur global existe déjà : " + existingAdmin.get().getEmail());
            return;
        }

        String email;
        String password;

        Console console = System.console();

        if (console != null) {
            email = console.readLine("Entrez l'email du Super Admin : ");

            char[] passwordArray;
            char[] confirmArray;

            do {
                passwordArray = console.readPassword("Entrez le mot de passe : ");
                confirmArray = console.readPassword("Confirmez le mot de passe : ");

                if (!Arrays.equals(passwordArray, confirmArray)) {
                    System.out.println("❌ Les mots de passe ne correspondent pas. Réessayez.");
                }
            } while (!Arrays.equals(passwordArray, confirmArray));

            password = new String(passwordArray);
            Arrays.fill(passwordArray, ' ');
            Arrays.fill(confirmArray, ' ');

        } else {
            Scanner scanner = new Scanner(System.in);
            System.out.print("Entrez l'email du Super Admin : ");
            email = scanner.nextLine();

            String password1;
            String password2;

            do {
                System.out.print("Entrez le mot de passe (⚠️ visible en clair) : ");
                password1 = scanner.nextLine();

                System.out.print("Confirmez le mot de passe : ");
                password2 = scanner.nextLine();

                if (!password1.equals(password2)) {
                    System.out.println("❌ Les mots de passe ne correspondent pas. Réessayez.");
                }
            } while (!password1.equals(password2));

            password = password1;
        }

//        if (email == null || !email.matches("^[\\w.-]+@[\\w-]+\\.[a-zA-Z]{2,}$")) {
//            System.out.println("❌ Email invalide.");
//            return;
//        }
//
//        if (password.length() < 8) {
//            System.out.println("❌ Le mot de passe doit contenir au moins 8 caractères.");
//            return;
//        }

        AppUser admin = AppUser.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .role(Role.SUPER_ADMIN)
                .build();

        userRepository.save(admin);
        System.out.println("✅ Super admin créé avec succès !");
    }
}
