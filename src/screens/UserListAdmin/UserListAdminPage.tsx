import { useEffect, useState } from "react";
import CardHeader from "../../components/CardHeader";
import TableHeader from "../../components/TableHeader";
import { UserListAdminVM } from "./UserListAdminVM";
import { UserServiceResponse } from "npl-service-module/dist/services/Response/UserService.response";
import NPLButton from "../../components/NPLButton";

const UserListAdminPage: React.FC = () => {
    const [users, setUsers] = useState<
        UserServiceResponse.GetUserInfo[] | undefined
    >(undefined);
    const [refresh, setRefresh] = useState<string>("");
    const limit = 10;
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        UserListAdminVM.getAllUsers(
            { limit: limit, offSet: offset },
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
    }, [refresh]);

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
                            "Marketing Email",
                            "Push notification",
                            "Cookie Tracking",
                            "Date Registered",
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
                                        {(user.canHostTournament as any as number) ===
                                        0 ? (
                                            <span className="bg-secondary-700 text-white p-2 rounded-lg">
                                                No
                                            </span>
                                        ) : (
                                            <span className="bg-primary-700 text-white p-2 rounded-lg">
                                                Yes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(user.permissions
                                            .marketingEmail as any as number) ===
                                        0 ? (
                                            <span className="bg-secondary-700 text-white p-2 rounded-lg">
                                                No
                                            </span>
                                        ) : (
                                            <span className="bg-primary-700 text-white p-2 rounded-lg">
                                                Yes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(user.permissions
                                            .pushNotification as any as number) ===
                                        0 ? (
                                            <span className="bg-secondary-700 text-white p-2 rounded-lg">
                                                No
                                            </span>
                                        ) : (
                                            <span className="bg-primary-700 text-white p-2 rounded-lg">
                                                Yes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {(user.permissions
                                            .cookieTracking as any as number) ===
                                        0 ? (
                                            <span className="bg-secondary-700 text-white p-2 rounded-lg">
                                                No
                                            </span>
                                        ) : (
                                            <span className="bg-primary-700 text-white p-2 rounded-lg">
                                                Yes
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.dateCreated}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="w-full flex justify-center pt-5">
                    <NPLButton
                        text="Back"
                        classes=""
                        onClick={() => {
                            setOffset(offset - limit);
                            setRefresh(new Date().toString());
                        }}
                    />
                    <NPLButton
                        text="Next"
                        classes=""
                        onClick={() => {
                            setOffset(offset + limit);
                            setRefresh(new Date().toString());
                        }}
                    />
                </div>
            </div>
        </section>
    );
};

export default UserListAdminPage;
