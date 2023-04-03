import { useEffect, useState } from "react";
import useSound from "use-sound"; // for handling the sound

import Preludium from "../assets/music/Preludium.wav"; // importing the music
import Cover from "../assets/img/ab67616d0000b2739186d745563f86b28cde2cea.jpeg";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons"; // for customazing the icons

export default function Player() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [time, setTime] = useState({
		min: "",
		sec: "",
	});
	const [currTime, setCurrTime] = useState({
		min: "",
		sec: "",
	});

	const [seconds, setSeconds] = useState();

	const [play, { pause, duration, sound }] = useSound(Preludium);

	useEffect(() => {
		if (duration) {
			const sec = duration / 1000;
			const min = Math.floor(sec / 60);
			const secRemain = Math.floor(sec % 60);
			setTime({
				min: min,
				sec: secRemain,
			});
		}
	}, [isPlaying]);

	useEffect(() => {
		const interval = setInterval(() => {
			if (sound) {
				setSeconds(sound.seek([]));
				const min = Math.floor(sound.seek([]) / 60);
				const sec = Math.floor(sound.seek([]) % 60);
				setCurrTime({
					min,
					sec,
				});
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [sound]);

	const playingButton = () => {
		if (isPlaying) {
			pause();
			setIsPlaying(false);
		} else {
			play();
			setIsPlaying(true);
		}
	};

	return (
		<div className="component">
			<h2>Playing Now</h2>
			<img className="musicCover" src={Cover} />
			<div>
				<h3 className="title">2SHER</h3>
				<p className="subTitle">Preludium</p>
			</div>
			<div>
				<div className="time">
					<p>
						{currTime.min}:{currTime.sec}
					</p>
					<p>
						{time.min}:{time.sec}
					</p>
				</div>
				<input
					type="range"
					min="0"
					max={duration / 1000}
					default="0"
					value={seconds}
					className="timeline"
					onChange={(e) => {
						sound.seek([e.target.value]);
					}}
				/>
			</div>
			<div>
				<button className="playButton">
					<IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
						<BiSkipPrevious />
					</IconContext.Provider>
				</button>
				{!isPlaying ? (
					<button className="playButton" onClick={playingButton}>
						<IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
							<AiFillPlayCircle />
						</IconContext.Provider>
					</button>
				) : (
					<button className="playButton" onClick={playingButton}>
						<IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
							<AiFillPauseCircle />
						</IconContext.Provider>
					</button>
				)}
				<button className="playButton">
					<IconContext.Provider value={{ size: "3em", color: "#27AE60" }}>
						<BiSkipNext />
					</IconContext.Provider>
				</button>
			</div>
		</div>
	);
}
