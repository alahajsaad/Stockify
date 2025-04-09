
type AuthCredential = {
  email: string;
  password: string;
};

const auth = async (authCredential: AuthCredential): Promise<string> => {
  const MOCK_EMAIL = "youssef@gmail.com";
  const MOCK_PASSWORD = "0000";
  const MOCK_TOKEN = "eyJhbGciOiJIUzUxMiJ9.eyJ0ZW5hbnRJZCI6IjZGMkE5NyIsInN1YiI6InlvdXNzZWZAZ21haWwuY29tIiwiZXhwIjoxNzQ2NDc2NzU0LCJpYXQiOjE3NDM4ODQ3NTQsInNjb3BlIjoiUk9MRV9BRE1JTiJ9.JlHSuTaK6slRCjShXlKl8ELaJRzKAaEwkATATL0D1mIh6NOXlNniS_6C5zb98aINJGK_Vl5KSol89LSmLBrKOw";

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  if (
    authCredential.email === MOCK_EMAIL &&
    authCredential.password === MOCK_PASSWORD
  ) {
    localStorage.setItem('token', MOCK_TOKEN);
    return MOCK_TOKEN;
  } else {
    throw new Error("Invalid email or password");
  }
};




// Export client service as a single object
const AuthService = {
  auth

};

export default AuthService;
