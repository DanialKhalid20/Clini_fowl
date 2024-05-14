const Newsletter = () => {
  return (
    <div className="bg-alabaster min-h-screen flex items-center justify-center">
      <div className="max-w-5xl bg-white shadow-md rounded-2xl p-8">
        <h2 className="text-2xl text-black font-bold mb-4">
          Subscribe to Our Newsletter
        </h2>
        <p className="text-gray-600 mb-8">
          Get the latest news and updates straight to your inbox.
        </p>
        <form>
          <div className="flex flex-col md:flex-row mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-gray-200 focus:bg-white border border-gray-300 focus:border-gray-500 rounded-md py-2 px-4 mb-2 md:mb-0"
            />
            <button
              type="submit"
              className="bg-sienna text-white font-bold py-2 px-4 rounded-md ml-0 md:ml-4"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
