import SearchBox from "@/components/SearchBox";
import { useAuthContext } from "@/context/AuthContext";
import * as React from "react";
import { MdLogout } from "react-icons/md";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { user, isloggedIn, logout } = useAuthContext();

  return (
    <div className="sticky top-0 left-0 right-0 border-primary border-t-4 px-8 py-3 flex flex-col md:flex-row md:justify-between space-y-3 md:space-y-0 items-center">
      <Link to="/">
        <h1 className="text-primary font-bold text-3xl">DevSözlük.</h1>
      </Link>
      <div className="w-full md:w-[400px]">
        <SearchBox />
      </div>
      <div className="space-x-2">
        {!isloggedIn ? (
          <>
            <Link to="/giris">giriş</Link>
            <Link to="/kayit">kaydol</Link>
          </>
        ) : (
          <div className="group relative flex items-center justify-center">
            <button className="py-2 px-4 rounded-lg text-white font-bold flex items-center justify-center gap-x-2">
              <img className="w-6 h-6 rounded" src={user?.profilePicture} alt="" />
              {user?.name}
            </button>
            <div className="absolute top-12 hidden group-focus-within:flex w-[130px] bg-[#3D3D3D] rounded font-medium text-center text-white p-2 gap-y-2 flex-col">
              <Link className="p-1 hover:bg-primary rounded" to="/panel/profil">
                profil
              </Link>
              <Link className="p-1 hover:bg-primary rounded" to="/panel/konu-olustur">
                konu oluştur
              </Link>
              <button
                onClick={logout}
                className="flex items-center justify-center p-1 gap-x-1 text-red-500 hover:bg-red-500 hover:text-white rounded"
              >
                <MdLogout size={18} />
                çıkış
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
