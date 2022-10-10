import useSWR from "swr";
import Image from 'next/image'
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Home = () => {
  const { data, error } = useSWR(
    "http://localhost:3000/api/api",
    fetcher
  );

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  var dom = []
  let num = data.length
  for (let i = 0; i < num; i++) {
    var title = data[i].item.videotitle
    var id = data[i].item.id
    var image = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`
    let stamp = data[i].item.timestamp
    for (let i = 0; i < stamp.length; i++) {
      var music = stamp[i].item.title
      var time = stamp[i].item.time
      var end = stamp[i + 1]?.item.time
      var s = time.split(':').reduce((acc, time) => (60 * acc) + +time);
      var e = end?.split(':').reduce((acc, time) => (60 * acc) + +time);
      dom.push(
        <a href={`/player?id=${id}&time=${s}&end=${e}`} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <Image src={image} width={'500%'} height={'300%'}></Image>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-96">{music}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-96">{title}</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 w-96">{time}</p>
          </div>
        </a>)
    }
  }
  return (
    dom
  )
};

export default Home;