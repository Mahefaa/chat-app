
export default function MainChannelPage() {
    return (
        <></>
    );
};

export function getServerSideProps() {
    return {
        redirect:{
            destination: "/channel/create"
        }
    }
}