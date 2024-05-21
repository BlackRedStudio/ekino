export default function HomePage() {
	return <main className="bg-white">
		<section className="space-y-7">
			<p className="text-center text-5xl font-bold uppercase italic
			underline text-orange-500">Jakiś tekst</p>
			<p className="text-center text-xl  text-red-500">Jakiś tekst</p>
			<p className="text-center text-sm text-blue-700">Jakiś tekst</p>
		</section>
		<section>
			<div className="relative bg-red-500 w-full h-24">
				<div className="absolute left-5 top-5 bg-gray-500 h-14 z-10 w-10"></div>
				<div className="absolute left-16 top-5 bg-blue-500 size-10"></div>
			</div>
		</section>
		<button className="bg-orange-500 uppercase text-white px-10 py-4
		rounded ml-10 my-5 hover:bg-orange-700 transition shadow-md
		focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">Start</button>
		<button disabled className="disabled:bg-gray-300 disabled:cursor-not-allowed bg-orange-500 uppercase text-white px-10 py-4
		rounded ml-10 my-5 hover:bg-orange-700 transition shadow-md
		focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-500">Stop</button>
		<section className="my-5 grid md:grid-cols-3 gap-5 text-center h-[300px]
		[&_div]:flex [&_div]:items-center [&_div]:justify-center">
			<div className="bg-red-500">Kolumna 1</div>
			<div className="bg-blue-500">Kolumna 2</div>
			<div className="bg-yellow-500">Kolumna 3</div>
		</section>
	</main>;
}
