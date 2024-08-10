import { useParams } from "react-router-dom";

type TournamentProps = {};

const AdminArenaDetailsPage: React.FC<TournamentProps> = (
    props: TournamentProps
) => {
    const { arenaId } = useParams<{ arenaId: string }>();
    const id = parseInt(arenaId!);

    return <div>arena {id}</div>;
};

export default AdminArenaDetailsPage;
