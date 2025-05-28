import AvatarGenerator from "src/components/AvatarGenerator";
import { Card, CardBody } from "src/components/ui/Card";
import { useAuth } from "../components/AuthProvider";
import { Button } from "src/components/ui";
import Modal from "src/components/ui/Modal";
import { useState } from "react";
import NewPasswordForm from "../forms/NewPasswordForm";

const ProfilePage : React.FC = () => {
    const {user} = useAuth()
    const [isEditPassword,setIsEditPassword] = useState<boolean>(false)
    return (
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-0 shadow-lg">
         <CardBody className="p-8">
        {user &&
        <div className="flex justify-between">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <AvatarGenerator 
                    name={user?.fullName}
                    size="large"
                    className="flex-shrink-0"
                />
                <div className="flex-1 text-center sm:text-left">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {user.fullName}
                    </h1>
                    <p className="text-lg text-gray-600 mb-4">
                    {user.sub}
                    </p>
                    
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                    <p>
                        {user.scope}
                    </p>
                    
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={() => setIsEditPassword(true)}>Changer password</Button>
            </div>
        </div>
        }

        <Modal title="Changer votre mot de passe" isOpen={isEditPassword} onClose={() => setIsEditPassword(false)} size="lg">
                <NewPasswordForm onSuccess={() => setIsEditPassword(false)}/>
        </Modal>
      </CardBody>
    </Card>
    );
}
export default ProfilePage ;