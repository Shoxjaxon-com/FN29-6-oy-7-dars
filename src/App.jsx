// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function CurrencyConverter() {
//   const [amount, setAmount] = useState("");
//   const [conversionRate, setConversionRate] = useState(null);
//   const [result, setResult] = useState("");
//   const API_KEY = "12280882fa-619378b92b-sntusg";

//   useEffect(() => {
//     axios
//       .get(`https://api.fastforex.io/fetch-one?from=USD&to=EUR&api_key=${API_KEY}`)
//       .then((response) => {
//         if (response.status === 200) setConversionRate(response.data.result.EUR);
//       })
//       .catch(console.error);
//   }, []);

//   const convertCurrency = (e) => {
//     e.preventDefault();
//     setResult((amount * conversionRate).toFixed(2));
//   };

//   return (
//     <div className="flex flex-col items-center p-6 min-h-screen bg-gray-200">
//       <form className="p-4 bg-white shadow rounded space-y-4" onSubmit={convertCurrency}>
//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="USD miqdorini kiriting"
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
//           Konvertatsiya qilish
//         </button>
//       </form>
//       {result && <p className="mt-4 text-lg text-blue-600">Natija: {result} EUR</p>}
//     </div>
//   );
// }

// export default CurrencyConverter;



// import React, { useState } from "react";
// import axios from "axios";

// function GitHubRepos() {
//   const [user, setUser] = useState("");
//   const [repositories, setRepositories] = useState([]);

//   const fetchRepos = (e) => {
//     e.preventDefault();
//     if (!user.trim()) return alert("Foydalanuvchi nomini kiriting!");
//     axios
//       .get(`https://api.github.com/users/${user}/repos`)
//       .then((res) => setRepositories(res.data))
//       .catch(console.error);
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
//       <form className="bg-white p-6 shadow-md rounded w-full max-w-md" onSubmit={fetchRepos}>
//         <input
//           type="text"
//           value={user}
//           onChange={(e) => setUser(e.target.value)}
//           placeholder="GitHub foydalanuvchi nomini kiriting"
//           className="w-full p-2 border rounded"
//         />
//         <button type="submit" className="mt-4 bg-blue-500 text-white w-full py-2 rounded">
//           Qidirish
//         </button>
//       </form>
//       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//         {repositories.map((repo) => (
//           <div key={repo.id} className="bg-white shadow-md rounded p-4">
//             <h3 className="text-lg font-semibold">{repo.name}</h3>
//             <p className="text-gray-500">{repo.description || "Izoh mavjud emas."}</p>
//             <a
//               href={repo.html_url}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-blue-500 underline mt-2 block"
//             >
//               Repozitoriyani ko'rish
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default GitHubRepos;



import React, { useState } from "react";
import axios from "axios";

function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = () => {
    if (!query) return alert("Qidiruv matni kiriting!");
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((res) => setBooks(res.data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded shadow w-full max-w-xl mx-auto">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Kitob nomini kiriting"
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={searchBooks}
          className="w-full bg-green-500 text-white py-2 rounded"
        >
          Qidirish
        </button>
      </div>
      {loading ? (
        <p className="text-center mt-6">Yuklanmoqda...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {books.map((book) => {
            const { title, authors, imageLinks } = book.volumeInfo || {};
            return (
              <div key={book.id} className="bg-white p-4 rounded shadow">
                <img
                  src={imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                  alt={title}
                  className="h-40 w-full object-cover mb-4"
                />
                <h3 className="font-bold">{title || "Nom mavjud emas"}</h3>
                <p>{authors ? authors.join(", ") : "Muallif noma'lum"}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookSearch;
