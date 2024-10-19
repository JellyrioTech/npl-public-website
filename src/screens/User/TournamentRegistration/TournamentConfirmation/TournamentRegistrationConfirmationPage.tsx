import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TournamentRegistrationConfirmationVM } from "./TournamentRegistrationConfirmationVM";
import { TournamentRegisterTypes, TournamentTypes } from "npl-service-module";
import { TournamentServiceResponse } from "npl-service-module/dist/services/Response/TournamentService.response";
import { routes, UserRoutes } from "../../../../util/routes";
import { useLoader } from "../../../../components/LoaderProvider";
import NSPLCheckboxField from "../../../../components/NSPLCheckboxField";
import NSPLButtonSquare from "../../../../components/NPLButtonSquare";
import TournamentRegistrationBaseContainer from "../TournamentRegistrationBaseContainer";

const TournamentRegistrationConfirmationPage: React.FC = () => {
    const { tournamentId } = useParams<{ tournamentId: string }>();
    const [, setUserStatus] = useState<
        TournamentRegisterTypes.status | undefined
    >(undefined);
    const [, setUserRules] = useState<
        Partial<TournamentServiceResponse.TournamentRules_Struct>
    >({});
    const [toc, setToc] = useState("");
    const [, setTournamentStatus] = useState<
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
        console.log("tournamentID from confirm:", tournamentId);
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

    return (
        <TournamentRegistrationBaseContainer>
            <h1 className="text-regTitle lg:text-xlTitle font-bold">
                Confirm Tournament Registration
            </h1>

            <div className="mt-5 lg:mt-7">
                <h2 className="text-lgBody lg:text-lgTitle font-medium">
                    Participant Agreement and Release Document
                </h2>
                <p className="text-regBody lg:text-lgBody mt-2 lg:mt-3">
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

            <div className="mt-7 mb-8 lg:mb-10">
                <h2 className="text-lgBody lg:text-lgTitle font-medium">
                    Are you ready to Register for the Tournament?
                </h2>
                <p className="text-regBody lg:text-lgBody mt-3">
                    Please accept and acknowledge all the check boxes below
                    before tapping Register now button
                </p>
                <div className="mt-4 lg:mt-8 flex flex-col gap-4">
                    <NSPLCheckboxField
                        onChange={(e) => setHasConsent(e.target.checked)}
                        isChecked={hasConsent}
                        isRequired={true}
                    >
                        <label className="text-regBody lg:text-lgBody flex-1 ">
                            I consent to use electronic records and signatures
                            for this transaction.
                        </label>
                    </NSPLCheckboxField>
                    <NSPLCheckboxField
                        onChange={(e) =>
                            setHasAgreedToTermsAndCondition(e.target.checked)
                        }
                        isChecked={hasAgreedToTermsAndCondition}
                        isRequired={true}
                    >
                        <label className="text-regBody lg:text-lgBody flex-1">
                            I have read and agree to the Terms and Conditions
                            outlined in the Participant Agreement and Release
                            Document.
                        </label>
                    </NSPLCheckboxField>
                    <NSPLCheckboxField
                        onChange={(e) => setHasAgreedToRules(e.target.checked)}
                        isChecked={hasAgreedToRules}
                        isRequired={true}
                    >
                        <label className="text-regBody lg:text-lgBody flex-1">
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
        </TournamentRegistrationBaseContainer>
    );
};

export default TournamentRegistrationConfirmationPage;
