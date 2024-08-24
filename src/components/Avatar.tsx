import { ErrorResponse } from "npl-service-module/dist/utils/Responses";
import { NetworkModule } from "../NetworkEngine";
import { useEffect, useState } from "react";

type AvatarProps = {
    url: string | undefined;
};

const Avatar: React.FC<AvatarProps> = (props: AvatarProps) => {
    const [avatar, setAvatar] = useState<string | undefined>();

    useEffect(() => {
        const getAvatar = async () => {
            if (props.url === undefined) return;

            const resp = await NetworkModule.userService.getImageUrl(props.url);
            if (resp instanceof ErrorResponse) {
                return "";
            }

            console.log("AVATAR=======", resp.result?.url);
            setAvatar(resp.result?.url);
        };

        getAvatar();
    }, []);

    return (
        <>
            <img className="w-10 h-10 bg-cover" src={avatar} />
        </>
    );
};

export default Avatar;
