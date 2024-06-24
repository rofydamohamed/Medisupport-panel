import React, { useRef, useEffect, useState } from 'react';
import './video.css';
import { connect, createLocalVideoTrack } from '@twilio/video';

const Video = () => {
    const [room, setRoom] = useState(null);
    const [localTrack, setLocalTrack] = useState(null);
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        const startVideo = async () => {
            const track = await createLocalVideoTrack();
            localVideoRef.current.appendChild(track.attach());
            setLocalTrack(track);
        };

        startVideo();

        return () => {
            if (localTrack) {
                localTrack.stop();
            }
        };
    }, [localTrack]);

    const handleConnect = async () => {
        const response = await fetch('YOUR_SERVER_URL/token'); // احصل على توكين من خادمك
        const data = await response.json();
        const room = await connect(data.token, { name: 'my-room' });
        setRoom(room);

        room.on('participantConnected', participant => {
            participant.tracks.forEach(publication => {
                if (publication.isSubscribed) {
                    const track = publication.track;
                    remoteVideoRef.current.appendChild(track.attach());
                }
            });

            participant.on('trackSubscribed', track => {
                remoteVideoRef.current.appendChild(track.attach());
            });
        });
    };

    return (
        <div className="container">
            <div className="video-container">
                <div ref={localVideoRef}></div>
                <div ref={remoteVideoRef}></div>
            </div>
            <button onClick={handleConnect}>Connect</button>
        </div>
    );
}

export default Video;