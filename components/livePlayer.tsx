import cn from "classnames";
import { useEffect, useRef, useState } from "react";
import usePlayerState from "../hooks/usePlayerState";
import useRadioCoStatus from "../hooks/useRadioCoStatus";
import useSchedule from "../hooks/useSchedule";
import Pause from "../icons/pause";
import Play from "../icons/play";
import Marquee from "./marquee";

const BroadcastingIndicator = ({
  status,
}: {
  status: "online" | "offline";
}) => {
  if (status === "online")
    return (
      <div className="grow-0 flex items-center space-x-6">
        <div className="shrink-0 w-7 h-7 sm:h-10 sm:w-10 rounded-full bg-red animate-pulse" />
        <p className="hidden md:block leading-none mt-1">Live</p>
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

  const { data } = useRadioCoStatus(REFUGE_WORLDWIDE);
  const { scheduleData, isLoading } = useSchedule();

  const isOnline = scheduleData?.status === "online";

  // const [liveNow, setliveNow] = useState("");

  // = () => {

  // };

  // const liveNow = data?.current_track?.title;

  const player = useRef<HTMLAudioElement>(null);
  const source = useRef<HTMLSourceElement>(null);

  const { isPlaying, play, pause } = usePlayerState({
    audioRef: player,
    sourceRef: source,
    url: AUDIO_SRC,
  });

  const playerWrapperClassNames = cn(
    "bg-black text-white h-12 sm:h-16 px-4 sm:px-8 flex items-center space-x-3 sm:space-x-9",
    {
      "sticky top-0 z-50": isOnline,
    }
  );

  useEffect(() => {
    if ("mediaSession" in navigator && scheduleData?.liveNow) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: scheduleData.liveNow,
        artist: "Refuge Worldwide",
        artwork: [
          {
            src: data.current_track.artwork_url,
            sizes: "1024x1024",
            type: "image/png",
          },
        ],
      });
    }
  }, [data]);

  // useEffect(() => {
  //   if (!isLoading) {
  //     if (data?.current_track?.title != "")
  //       setliveNow(data.current_track.title);
  //     else setliveNow(scheduleData.liveNow.title);
  //   }
  // }, [scheduleData, data]);

  return (
    <section className={playerWrapperClassNames}>
      <BroadcastingIndicator status={data?.status} />

      {!isLoading ? (
        <Marquee
          key={scheduleData.liveNow}
          text={<span className="pr-8">{scheduleData.liveNow}</span>}
        />
      ) : null}

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
        <p className="hidden md:block leading-none mt-1">Loading Broadcast</p>
      </div>
    </section>
  );
}
