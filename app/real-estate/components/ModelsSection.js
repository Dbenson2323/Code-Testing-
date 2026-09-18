export default function ModelsSection({ models }) {
  return (
    <div className="grid sm:grid-cols-3 gap-5">
      {models.map((model) => (
        <div key={model.id} className="rounded-xl border border-[#D8CDB8] bg-white p-6 flex flex-col">
          <h3 className="text-lg font-serif font-bold text-[#1F3A34]">{model.name}</h3>
          <p className="text-sm text-[#5C5443] mt-2 flex-1">{model.description}</p>
          {model.file ? (
            <a
              href={`/real-estate/models/${model.file}`}
              download
              className="mt-4 inline-block text-center px-4 py-2 rounded-lg bg-[#B54A32] text-white font-semibold hover:bg-[#9A3D28] transition-colors"
            >
              Download
            </a>
          ) : (
            <span className="mt-4 inline-block text-center px-4 py-2 rounded-lg bg-[#EDE6D6] text-[#9C927C] font-semibold cursor-not-allowed">
              Coming soon
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
