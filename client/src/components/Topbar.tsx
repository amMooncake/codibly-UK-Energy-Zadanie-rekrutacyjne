
export default function Topbar() {
    return (
        <header className="sticky top-0 w-full bg-white z-50">
            <div className="flex h-14 items-center justify-center px-4 sm:justify-between">
                <a className="flex items-center" href="/">
                    <span className="font-bold">
                        EcoCharge UK
                    </span>
                </a>
                <span className="hidden sm:block text-sm font-medium text-muted-foreground">
                    Project made by Aleksy Malawski for Codibly IT Academy
                </span>

            </div>
        </header>
    )
}