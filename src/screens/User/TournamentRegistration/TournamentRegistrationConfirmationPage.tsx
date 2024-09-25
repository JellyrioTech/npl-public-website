import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TournamentRegistrationConfirmationVM } from "./TournamentRegistrationConfirmationVM";
import { TournamentRegisterTypes, TournamentTypes } from "npl-service-module";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { routes, UserRoutes } from "../../../util/routes";
import BaseContent from "../../../components/BaseContent";
import NPLButton from "../../../components/NPLButton";
import { useLoader } from "../../../components/LoaderProvider";
import NSPLCheckboxIcon from "../../../components/Icons/NSPLCheckboxIcon";
import NSPLCheckboxField from "../../../components/NSPLCheckboxField";
import NSPLButtonSquare from "../../../components/NPLButtonSquare";

const TournamentRegistrationConfirmationPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [userStatus, setUserStatus] = useState<
        TournamentRegisterTypes.status | undefined
    >(undefined);
    const [rules, setUserRules] = useState<
        Partial<TournamentServiceResponse.TournamentRules_Struct>
    >({});
    const [toc, setToc] = useState("");
    const [tournamentStatus, setTournamentStatus] = useState<
        TournamentTypes.Status | undefined
    >();
    const [hasAgreedToTermsAndCondition, setHasAgreedToTermsAndCondition] =
        useState(false);
    const [hasAgreedToRules, setHasAgreedToRules] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [error, setError] = useState("");
    const naivgate = useNavigate();
    const { showLoader, hideLoader } = useLoader();

    useEffect(() => {
        TournamentRegistrationConfirmationVM.getTournamentDetails(
            Number(tournamentId),
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (code: number) => {
                    console.log("Yooo");
                    if (code === 2) {
                        naivgate(routes.Home);
                        return;
                    }
                },
                success: (obj) => {
                    if (obj.userStatus === "pending") {
                        window.location.pathname = `${UserRoutes.TournamentPayment}/${tournamentId}`;
                        return;
                    }
                    setUserStatus(obj.userStatus);
                    setUserRules(obj.rules);
                    setToc(obj.toc);
                    setTournamentStatus(obj.status);
                },
            }
        );
    }, []);

    const registerToTournament = () => {
        setError("");
        if (!hasConsent || !hasAgreedToRules || !hasAgreedToTermsAndCondition) {
            setError(
                "Please accept all the checkboxes before continuing to register"
            );
            return;
        }
        TournamentRegistrationConfirmationVM.registerTournament(
            Number(tournamentId),
            {
                loaderCallback: (loader) => {
                    loader ? showLoader() : hideLoader();
                },
                errorCallBack: (_, errorMsg) => {
                    setError(errorMsg || "");
                },
                success: () => {
                    window.location.pathname = `${UserRoutes.TournamentPayment}/${tournamentId}`;
                },
            }
        );
    };

    // return (
    //     // <BaseContent innerStyle="flex flex-col gap-4">
    //     <div className="w-full max-w-[1200px] mx-auto py-10">
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Tournament Rules and Guidelines
    //             </h2>
    //             <p className="mt-3 font-roboto text-md lg:text-lg">
    //                 Please go through all the rules and Terms and Conditions -
    //                 it is important to follow the guidelines for safe and best
    //                 experience for everyone playing in the tournament
    //             </p>
    //         </div>
    //         {rules.sections?.map((section) => (
    //             <div className="bg-neutral-100 p-5 rounded-xl ">
    //                 <h2 className="font-oswald font-bold text-xl lg:text-2xl text-secondary-500">
    //                     {section.header}
    //                 </h2>
    //                 <p className="mt-3 font-roboto text-md lg:text-lg">
    //                     {section.body}
    //                 </p>
    //                 <ul className="list-disc list-inside space-y-2 mt-5 mb- font-roboto">
    //                     {section.lists.map((list) => (
    //                         <li>{list}</li>
    //                     ))}
    //                 </ul>
    //             </div>
    //         ))}
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Participant Agreement and Release Document
    //             </h2>
    //             <p className="mt-3 font-roboto text-md lg:text-lg">
    //                 Please make sure you go through the{" "}
    //                 <a
    //                     href={`https://f004.backblazeb2.com/file/npl-docs-public/${toc}`}
    //                     target="_blank"
    //                     className="text-blue-700 font-bold underline"
    //                 >
    //                     Participant Agreement and Release Document by tapping
    //                     the link here
    //                 </a>
    //                 . If you are unable to read or access the document please
    //                 send us an email to info@nesterin.com for a copy of the
    //                 document.
    //             </p>
    //         </div>
    //         {/* {(userStatus === "pending" || userStatus === undefined) &&
    //         tournamentStatus === "open" ? ( */}
    //         <div className="bg-neutral-100 p-5 rounded-xl ">
    //             <h2 className="font-oswald font-bold text-xl lg:text-2xl ">
    //                 Are you ready to Register for the Tournament?
    //             </h2>
    //             {error !== "" ? (
    //                 <p className="text-red-600 pt-3 text-sm font-bold">
    //                     {error}
    //                 </p>
    //             ) : null}
    //             <p className="mt-3 font-roboto text-md lg:text-lg">
    //                 Please accept and acknowledge all the check boxes below
    //                 before tapping Register now button
    //             </p>
    //             <span className="flex items-center pt-5">
    //                 <input
    //                     type="checkbox"
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                         setHasConsent(e.target.checked);
    //                     }}
    //                     checked={hasConsent}
    //                     className="w-[20px] h-[20px] focus:ring-2 text-secondary-300 focus:ring-secondary-300 bg-secondary-300 mr-3 rounded"
    //                 />
    //                 <label className="text-sm font-bold flex-1">
    //                     I consent to use electronic records and signatures for
    //                     this transaction.
    //                 </label>
    //             </span>
    //             <span className="flex items-center pt-3">
    //                 <input
    //                     type="checkbox"
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                         setHasAgreedToTermsAndCondition(e.target.checked);
    //                     }}
    //                     checked={hasAgreedToTermsAndCondition}
    //                     className="w-[20px] h-[20px] focus:ring-2 text-secondary-300 focus:ring-secondary-300 bg-secondary-300 mr-3 rounded"
    //                 />
    //                 <label className="text-sm font-bold flex-1 ">
    //                     I have read and agree to the Terms and Conditions
    //                     outlined in the Participant Agreement and Release
    //                     Document.
    //                 </label>
    //             </span>
    //             <span className="flex items-center pt-3">
    //                 <input
    //                     type="checkbox"
    //                     onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
    //                         setHasAgreedToRules(e.target.checked);
    //                     }}
    //                     checked={hasAgreedToRules}
    //                     className="w-[20px] h-[20px] focus:ring-2 text-secondary-300 focus:ring-secondary-300 bg-secondary-300 mr-3 rounded"
    //                 />
    //                 <label className="text-sm font-bold flex-1 ">
    //                     I have read and agree with all rules
    //                 </label>
    //             </span>
    //             <NPLButton
    //                 text="Register and Continue to payment"
    //                 onClick={registerToTournament}
    //             />
    //         </div>
    //         {/* ) : null} */}
    //     </div>
    //     // </BaseContent>
    // );

    return (
        <div className="w-full max-w-[1200px] mx-auto py-10">
            <div className="w-[90%] mx-auto lg:w-[960px] py-10 px-14 bg-neutral-300">
                <h1 className="text-xlTitle font-bold">
                    Confirm Tournament Registration
                </h1>

                <div className="mt-7">
                    <h2 className="text-lgTitle font-medium">
                        Participant Agreement and Release Document
                    </h2>
                    <p className="text-lgBody mt-3">
                        Please make sure you go through the{" "}
                        <a
                            href={`https://f004.backblazeb2.com/file/npl-docs-public/${toc}`}
                            target="_blank"
                            className="font-bold text-secondary-500"
                        >
                            Participant Agreement and Release Document
                        </a>{" "}
                        by tapping the link here. If you are unable to read or
                        access the document please send us an email to
                        <span className="font-bold text-secondary-500">
                            {" "}
                            info@nesterin.com
                        </span>{" "}
                        for a copy of the document.
                    </p>
                </div>

                <div className="mt-7 mb-10">
                    <h2 className="text-lgTitle font-medium">
                        Are you ready to Register for the Tournament?
                    </h2>
                    <p className="text-lgBody mt-3">
                        Please accept and acknowledge all the check boxes below
                        before tapping Register now button
                    </p>
                    <div className="mt-8 flex flex-col gap-4">
                        <NSPLCheckboxField
                            onChange={(e) => setHasConsent(e.target.checked)}
                            isChecked={hasConsent}
                            isRequired={true}
                        >
                            <label className="text-lgBody">
                                I consent to use electronic records and
                                signatures for this transaction.
                            </label>
                        </NSPLCheckboxField>
                        <NSPLCheckboxField
                            onChange={(e) =>
                                setHasAgreedToTermsAndCondition(
                                    e.target.checked
                                )
                            }
                            isChecked={hasAgreedToTermsAndCondition}
                            isRequired={true}
                        >
                            <label className="text-lgBody flex-1">
                                I have read and agree to the Terms and
                                Conditions outlined in the Participant Agreement
                                and Release Document.
                            </label>
                        </NSPLCheckboxField>
                        <NSPLCheckboxField
                            onChange={(e) =>
                                setHasAgreedToRules(e.target.checked)
                            }
                            isChecked={hasAgreedToRules}
                            isRequired={true}
                        >
                            <label className="text-lgBody">
                                I have read and agree with all rules.
                            </label>
                        </NSPLCheckboxField>
                    </div>
                </div>

                {error && <p className="text-red-600 mb-5 text-sm">{error}</p>}
                <NSPLButtonSquare
                    text={"Continue To Payment"}
                    type="button"
                    onClick={registerToTournament}
                ></NSPLButtonSquare>
            </div>
        </div>
    );
};

export default TournamentRegistrationConfirmationPage;
