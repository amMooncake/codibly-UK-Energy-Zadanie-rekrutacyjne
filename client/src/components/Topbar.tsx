
export default function Topbar() {
    return (
        <header className="sticky top-0 w-full bg-white z-50 ">
            <div className="flex h-14 items-center justify-between px-15">
                <a className="flex items-center" href="/">
                    <span className="font-bold sm:inline-block">
                        EcoCharge UK
                    </span>
                </a>
                <span className="text-sm font-medium text-muted-foreground mr-0">
                    Project made by Aleksy Malawski for Codibly IT Academy
                </span>

            </div>
        </header>
    )
}