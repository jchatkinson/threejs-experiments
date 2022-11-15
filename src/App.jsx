

export default function App({links}) {

  return (
    <section className="bg-white min-h-screen">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl ">Three.js Experiments</h1>
        <LinkList links={links} />
      </div>
    </section>
  )
}

function LinkList({links}) {
  return (
    <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16 md:grid-cols-2">
      {links.map((l,ii) => <Link key={ii} title={l.title} date={l.date} url={l.url} desc={l.desc} />)}
    </div>
  )
}
function Link({title, url, desc, date, img="https://upload.wikimedia.org/wikipedia/commons/3/3f/Three.js_Icon.svg", }) {
  return (
    <div className="lg:flex">
      <img className="object-cover rounded-lg w-36" src={img} />
      <div className="flex flex-col justify-start py-6 lg:mx-6">
          <a href={url} className="text-xl font-semibold text-gray-800 hover:underline ">{title}</a>
          <p className="font-mono text-sm tracking-tight">{desc}</p>
          <span className="text-sm text-gray-500 font-mono tracking-tight">{date}</span>
      </div>
  </div>
  )
}