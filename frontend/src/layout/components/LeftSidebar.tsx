import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignedIn } from "@clerk/clerk-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
    const isLoading = false;
    return (
        <div className="h-full flex flex-col gap-2">
            {/* Navigation Menu */}

            <div className="rounded-lg bg-zinc-900 p-4">
                <div className="flex flex-col gap-2">
                    <Link to={"/"}
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800",
                        })
                    )}
                    >
                        <HomeIcon className="mr-2 size-5" />
                        <span className="hidden md:inline">Home</span>
                    </Link>

                    <SignedIn>
                    <Link to={"/chat"}
                    className={cn(
                        buttonVariants({
                            variant: "ghost",
                            className: "w-full justify-start text-white hover:bg-zinc-800",
                        })
                    )}
                    >
                        <MessageCircle className="mr-2 size-5" />
                        <span className="hidden md:inline">Messages</span>
                    </Link>
                    </SignedIn>

            </div>
        </div>

        {/* Library Section */}
        <div className="flex-1 rounded-lg bg-zinc-900 p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-white px-2">
                    <Library className="size-5 mr-2" />
                    <span className="hidden md:inline">Playlists</span>
                </div>
            </div>

            <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-2">{isLoading? <PlaylistSkeleton /> : "some music"}
                </div>

            </ScrollArea>

        </div>


        </div>
    );
};

export default LeftSidebar;