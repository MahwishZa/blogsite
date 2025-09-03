import Newsletter from "./newsletter";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <>
            <Newsletter />
            <footer className="text-center text-sm py-6 bg-neutral-100 mt-auto">
                <div className="flex flex-col justify-between items-center">
                    <p className="mt-2">&copy; {year} Dev Ninja. All Rights Reserved.</p>
                </div>
            </footer>
        </>
    );
}
