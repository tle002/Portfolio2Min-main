import HeroVideoDialog from "@/components/ui/hero-video-dialog";



export function HeroVideoDialogDemoTopInBottomOut() {
  return (
    <div className="relative">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/ekDN6uzH1Zs?si=ooluhaIvEWSz8ulH"
        thumbnailSrc="https://res.cloudinary.com/dgsr2ti0d/image/upload/v1731607947/Screenshot_2024-11-14_233814_totr30.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="top-in-bottom-out"
        videoSrc="https://www.youtube.com/embed/ekDN6uzH1Zs?si=ooluhaIvEWSz8ulH"
        thumbnailSrc="https://res.cloudinary.com/dgsr2ti0d/image/upload/v1731607947/Screenshot_2024-11-14_233814_totr30.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
