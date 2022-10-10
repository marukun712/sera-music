import { useRouter } from "next/router";
import YouTube from 'react-youtube';
import Fetch from "../components/fetch";
import Image from "next/image";
import $ from 'jquery'

export default function Player() {
  const Router = useRouter();
  const opts = {
    width: 400,
    height: 225,
    playerVars: {
      start: Router.query.time,
      end: Router.query.end,
      autoplay: 1
    },
  };

  function _onReady(event) {
    event.target.mute();
    event.target.playVideo();
    $('#mutebutton').empty();
    $('#mutebutton').append('<Image src="/img/mute.png" width="50" height="50"></Image>')
    let muteButton = document.getElementById("mutebutton");
    muteButton.value = 'mute'
    document.getElementById("volume").value = event.target.getVolume();

    let playButton = document.getElementById("playpause");
    playButton.addEventListener("click", function () {
      if (playButton.value === 'play') {
        event.target.pauseVideo();
      } else if (playButton.value === 'pause') {
        event.target.playVideo();
      }
    });

    muteButton.addEventListener("click", function () {
      if (muteButton.value === 'mute') {
        event.target.unMute();
        muteButton.value = 'unmute'
        $('#mutebutton').empty();
        $('#mutebutton').append('<Image src="/img/unmute.png" width="50" height="50"></Image>')
      } else if (muteButton.value === 'unmute') {
        event.target.mute();
        muteButton.value = 'mute'
        $('#mutebutton').empty();
        $('#mutebutton').append('<Image src="/img/mute.png" width="50" height="50"></Image>')
      }
    });

    document.getElementById("-30").addEventListener("click", function () {
      let time = event.target.getCurrentTime() - 30
      event.target.seekTo(time, true);
    })

    document.getElementById("+30").addEventListener("click", function () {
      let time = event.target.getCurrentTime() + 30
      event.target.seekTo(time, true);
    })

    document.getElementById("start").addEventListener("click", function () {
      event.target.seekTo(Router.query.time, true);
    })

    document.getElementById("end").addEventListener("click", function () {
      event.target.seekTo(Router.query.end, true);
    })

    document.getElementById("range").addEventListener(`input`, function () {
      let time = document.getElementById("range").value
      event.target.seekTo(time, true);
    });

    document.getElementById("volume").addEventListener(`input`, function () {
      let value = document.getElementById("volume").value
      event.target.setVolume(value, true);
    });
  }
  function _onError(event) {
  }
  function _onPlay(event) {
    var setvalue = function () {
      if (event.target.getPlayerState() === 1) {
        document.getElementById("range").value = event.target.getCurrentTime()
      }
    };

    let playButton = document.getElementById("playpause");
    playButton.value = 'play'
    $('#playpause').empty();
    $('#playpause').append('<Image src="/img/pause.png" width="50" height="50" ></Image>')
    setInterval(setvalue, 100)
  }
  function _onPause(event) {
    let playButton = document.getElementById("playpause");
    playButton.value = 'pause'
    $('#playpause').empty();
    $('#playpause').append('<Image src="/img/play.png" width="50" height="50"></Image>')
  }
  function _onEnd(event) {
  }

  return (
    <div className="player md:flex">
      <div className="md:px-40">
        <YouTube
          videoId={Router.query.id}
          opts={opts}
          onReady={_onReady}
          onError={_onError}
          onPlay={_onPlay}
          onEnd={_onEnd}
          onPause={_onPause}
        />
      </div>
      <div className="fetch h-screen" style={{ overflow: 'scroll' }}><Fetch /></div>
      <div className="fixed bottom-0 w-screen">
        <div className="bg-white dark:bg-gray-800 rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
          <input type="range" min={Router.query.time} max={Router.query.end} step="1" className="range range-primary" id='range' />
        </div>
        <div className="bg-gray-50 text-black dark:bg-gray-900 dark:text-white lg:rounded-b-xl py-1 sm:px-3 lg:px-1 xl:px-3 grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 items-center">
          <button type="button" className="hidden sm:block lg:hidden xl:block mx-auto" id='start'>
            <svg width="17" height="18">
              <path d="M0 0h2v18H0V0zM4 9l13-9v18L4 9z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" className="hidden sm:block lg:hidden xl:block mx-auto" id="end">
            <svg width="17" height="18" viewBox="0 0 17 18" fill="none" >
              <path d="M17 0H15V18H17V0Z" fill="currentColor" />
              <path d="M13 9L0 0V18L13 9Z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" className="mx-auto" id='-30'>
            <svg width="34" height="39" fill="none">
              <path d="M12.878 26.12c1.781 0 3.09-1.066 3.085-2.515.004-1.104-.665-1.896-1.824-2.075v-.068c.912-.235 1.505-.95 1.5-1.93.005-1.283-1.048-2.379-2.727-2.379-1.602 0-2.89.968-2.932 2.387h1.274c.03-.801.784-1.287 1.64-1.287.892 0 1.475.541 1.471 1.346.004.844-.673 1.398-1.64 1.398h-.738v1.074h.737c1.21 0 1.91.614 1.91 1.491 0 .848-.738 1.424-1.765 1.424-.946 0-1.683-.486-1.734-1.262H9.797c.055 1.424 1.317 2.395 3.08 2.395zm7.734.025c2.016 0 3.196-1.645 3.196-4.504 0-2.838-1.197-4.488-3.196-4.488-2.003 0-3.196 1.645-3.2 4.488 0 2.855 1.18 4.5 3.2 4.504zm0-1.138c-1.18 0-1.892-1.185-1.892-3.366.004-2.174.716-3.371 1.892-3.371 1.172 0 1.888 1.197 1.888 3.37 0 2.182-.712 3.367-1.888 3.367z" fill="currentColor" />
              <path d="M1 22c0 8.837 7.163 16 16 16s16-7.163 16-16S25.837 6 17 6" stroke="currentColor" stroke-width="1.5" />
              <path d="M17 0L9 6l8 6V0z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" className="mx-auto" id='playpause' value={'play'}>
            <Image src="/img/pause.png" width={50} height={50}></Image>
          </button>
          <button type="button" className="mx-auto" id="+30">
            <svg width="34" height="39" fill="none">
              <path d="M12.878 26.12c1.781 0 3.09-1.066 3.085-2.515.004-1.104-.665-1.896-1.824-2.075v-.068c.912-.235 1.505-.95 1.5-1.93.005-1.283-1.048-2.379-2.727-2.379-1.602 0-2.89.968-2.932 2.387h1.274c.03-.801.784-1.287 1.64-1.287.892 0 1.475.541 1.471 1.346.004.844-.673 1.398-1.64 1.398h-.738v1.074h.737c1.21 0 1.91.614 1.91 1.491 0 .848-.738 1.424-1.765 1.424-.946 0-1.683-.486-1.734-1.262H9.797c.055 1.424 1.317 2.395 3.08 2.395zm7.734.025c2.016 0 3.196-1.645 3.196-4.504 0-2.838-1.197-4.488-3.196-4.488-2.003 0-3.196 1.645-3.2 4.488 0 2.855 1.18 4.5 3.2 4.504zm0-1.138c-1.18 0-1.892-1.185-1.892-3.366.004-2.174.716-3.371 1.892-3.371 1.172 0 1.888 1.197 1.888 3.37 0 2.182-.712 3.367-1.888 3.367z" fill="currentColor" />
              <path d="M33 22c0 8.837-7.163 16-16 16S1 30.837 1 22 8.163 6 17 6" stroke="currentColor" stroke-width="1.5" />
              <path d="M17 0l8 6-8 6V0z" fill="currentColor" />
            </svg>
          </button>
          <button type="button" value={'mute'} id='mutebutton'>
          </button>
          <input type="range" id="volume" min="0" max="100" step="1" className="range range-xs" />

        </div>

      </div>
    </div >
  );

}
