import notFound from "../assets/404.png";

const Missing = () => {
    return (
        <div className="flex flex-col items-center justify-center pb-6 h-screen">
            <img src={notFound} alt="Sign in" className="mt-5 mb-7 lg:w-96 md:w-80 w-64 h-auto" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Oops! Page Not Found</h1>
            <p className="text-lg text-gray-600 mb-6">The page you are looking for does not exist.</p>
            <a href="/fund" className="text-blue-500 hover:underline">Go back to Home</a>
        </div>
    );
}

export default Missing
