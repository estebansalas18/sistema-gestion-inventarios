import { Enum_RoleName } from "@prisma/client";
import { useSession } from "next-auth/react";

interface PrivateComponentProps {
    children: React.ReactNode;
    roleName: Enum_RoleName;
}

const PrivateComponent = ({children, roleName}: PrivateComponentProps) => {
    const { data } = useSession();
    if(data?.user.role?.name === roleName) return <div>{children}</div>;
    return null;
};

export { PrivateComponent };