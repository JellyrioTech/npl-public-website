import { useEffect, useState } from "react";
import CardHeader from "../../components/CardHeader";
import TableHeader from "../../components/TableHeader";
import { UserListAdminVM } from "./UserListAdminVM";
import { UserServiceResponse } from "npl-service-module/dist/services/Response/UserService.response";

const UserListAdminPage: React.FC = () => {
    const [users, setUsers] = useState<
        UserServiceResponse.GetUserInfo[] | undefined
    >(undefined);

    useEffect(() => {
        UserListAdminVM.getAllUsers(
            { limit: 10, offSet: 0 },
            {
                loaderCallback: () => {},
                errorCallBack: () => {
                    setUsers([]);
                },
                success: (obj) => {
                    setUsers(obj);
                    console.log(obj);
                },
            }
        );
    }, []);

    return (
        <section className="w-full max-w-[1200px] p-8 rounded shadow mx-auto bg-neutral-200">
            <CardHeader header="Users" type="h1" />
            <div className="relative overflow-x-auto rounded-lg md:mx-10 pt-4">
                <table className="w-full text-sm text-left rtl:text-right">
                    <TableHeader
                        headerNames={[
                            "SSO ID",
                            "Avatar",
                            "Name",
                            "State",
                            "address",
                            "Can Host Tournament",
                        ]}
                    />
                    <tbody className="border-b border-primary-700">
                        {users?.map((user) => {
                            return (
                                <tr className="text-black border-b text-center border-primary-700 cursor-pointer hover:bg-primary-100">
                                    <th
                                        className="whitespace-nowrap font-semibold
                                                    uppercase px-4 py-1 md:px-6 md:py-4"
                                        scope="row"
                                    >
                                        {user.userSSOId}
                                    </th>
                                    <td className="px-6 py-4">
                                        {user.avatarLink}
                                    </td>
                                    <td className="px-6 py-4">{user.name}</td>
                                    <td className={`px-6 py-4`}>
                                        {user.state || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.address || "-"},{" "}
                                        {user.city || "-"},{" "}
                                        {user.zipCode || "-"}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.canHostTournament}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default UserListAdminPage;
