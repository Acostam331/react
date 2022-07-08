import './Loading.css';

const Loading = () => {
  return (
    // <div className="flex items-center justify-center space-x-2 my-2 mb-4 animate-pulse">
    //   <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
    //   <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
    //   <div className="w-5 h-5 bg-blue-400 rounded-full"></div>
    // </div>
    <div className="square flex p-4 flex-col bg-blue-400 rounded-3xl animate-pulse">
      <div className="bg-indigo-900 ml-4 my-2 w-1/5 h-5"></div>
      <div className="bg-indigo-900 mx-auto my-2 w-11/12 h-52"></div>
      <div className="bg-indigo-900 ml-4 my-2 w-3/5 h-5"></div>
      <div className="bg-indigo-900 ml-4 my-2 w-4/5 h-5"></div>
    </div>
  );
};

export default Loading;
