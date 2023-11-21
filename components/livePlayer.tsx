import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import usePlayerState from "../hooks/usePlayerState";
import useSchedule from "../hooks/useSchedule";
import Pause from "../icons/pause";
import Play from "../icons/play";
import Marquee from "./marquee";
import Link from "next/link";
import { Cross } from "../icons/cross";

const BroadcastingIndicator = ({
  status,
  isLoading,
  error,
}: {
  status: "online" | "offline";
  isLoading: boolean;
  error: Error;
}) => {
  if (status === "online")
    return (
      <div className="grow-0 flex items-center space-x-6">
        <div className="shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-red animate-pulse" />
        <p className="hidden md:block leading-none mt-1">Live</p>
      </div>
    );
  else if (isLoading)
    return (
      <div className="grow-0 flex items-center space-x-6 opacity-70">
        <div className="shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white/25" />
        <div className="h-6 sm:h-9 w-56 flex items-center space-x-2 whitespace-nowrap px-2 ml-6 bg-white opacity-25"></div>
        <p className="hidden leading-none mt-1 animate-pulse">Loading</p>
      </div>
    );

  return (
    <div className="grow-0 flex items-center space-x-6">
      <div className="shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white/25" />
      <p className="leading-none mt-1">Offline</p>
    </div>
  );
};

export default function LivePlayer() {
  const REFUGE_WORLDWIDE = "s3699c5e49";

  const AUDIO_SRC = `https://streaming.radio.co/${REFUGE_WORLDWIDE}/listen`;

  const { scheduleData, isLoading, error } = useSchedule();

  const isOnline = scheduleData?.status === "online";

  const player = useRef<HTMLAudioElement>(null);
  const source = useRef<HTMLSourceElement>(null);

  const { isPlaying, play, pause } = usePlayerState({
    audioRef: player,
    sourceRef: source,
    url: AUDIO_SRC,
  });

  const playerWrapperClassNames = cn(
    "bg-black text-white h-12 sm:h-16 pl-4 sm:pl-8 flex items-center space-x-3 sm:space-x-9",
    {
      "sticky top-0 z-50": isOnline,
    }
  );

  useEffect(() => {
    if ("mediaSession" in navigator && scheduleData?.liveNow) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: scheduleData.liveNow.title,
        artist: "Refuge Worldwide",
        artwork: [
          {
            src: scheduleData.liveNow.artwork + "?w=384&h=384&fit=fill&f=faces",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: scheduleData.liveNow.artwork + "?w=512&h=512&fit=fill&f=faces",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      });
    }
  }, [scheduleData]);

  return (
    <section className={playerWrapperClassNames}>
      {isOnline && (
        <button
          className="grow-0 h-7 w-7 sm:h-9 sm:w-9 focus:outline-none focus:ring-4"
          onClick={isPlaying ? pause : play}
          aria-label={
            isPlaying ? "Pause Live Broadcast" : "Play Live Broadcast"
          }
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
      )}
      <BroadcastingIndicator
        status={scheduleData?.status}
        isLoading={isLoading}
        error={error}
      />

      {!isLoading && !error && scheduleData?.liveNow?.title && (
        <Marquee
          key={scheduleData?.liveNow.title}
          text={<span>{scheduleData?.liveNow.title}</span>}
        />
      )}

      {!isLoading && (
        <Link
          className="pt-2 pb-2 sm:pt-4 sm:pb-4 px-4 md:px-8 !ml-0 border-l-2 self-stretch items-center flex"
          href="/schedule"
        >
          <h2 className="hidden lg:block whitespace-nowrap underline font-sans font-medium py-1.5">
            Schedule
          </h2>
          <span className="sr-only lg:hidden">Schedule</span>
          <Cross className="rotate-45 lg:hidden" strokeWidth="3" size={15} />
        </Link>
      )}

      <audio hidden id="refuge-live-player" preload="none" ref={player}>
        <source ref={source} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  );
}

export function LivePlayerLoading() {
  return (
    <section className="bg-black text-white h-12 sm:h-16 px-4 sm:px-8 flex items-center">
      <div className="grow-0 flex items-center space-x-6">
        <div className="shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-white/25" />
        <div className="h-6 sm:h-9 w-56 flex items-center space-x-2 whitespace-nowrap px-2 ml-6 bg-white/25"></div>
        <p className="hidden leading-none mt-1">Loading</p>
      </div>
    </section>
  );
}
