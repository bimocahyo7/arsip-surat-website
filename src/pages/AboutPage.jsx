import { Avatar, Typography } from "@mui/material";
import ImageProfile from "/2131740053_profile.webp";

function AboutPage() {
  return (
    <div className="bg-slate-200 min-h-full flex">
      <div className="container bg-gradient-to-tr from-orange-200 to-purple-800 p-9 mx-10 my-10 rounded-lg shadow-md">
        <div className="mb-8">
          <p className="text-2xl font-bold text-white">About Me</p>
        </div>
        <div className="flex gap-11 items-center">
          <Avatar
            alt="Profile Picture"
            src={ImageProfile}
            className="hover:scale-110 transition-transform duration-300 ease-in-out"
            sx={{
              width: "200px",
              height: "200px",
              borderRadius: "10px",
              border: "2px solid black",
              boxShadow: "5px 5px black",
            }}
          />
          <div className="flex gap-2">
            <div className="flex flex-col justify-center">
              <Typography variant="h6" gutterBottom className="text-slate-800">
                Nama
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                NIM
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                Prodi
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                Tanggal
              </Typography>
            </div>
            <div className="flex flex-col justify-center">
              <Typography variant="h6" gutterBottom className="text-slate-800">
                : Bimo Cahyo Kusumo
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                : 2131740053
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                : Teknologi Informasi
              </Typography>
              <Typography variant="h6" gutterBottom className="text-slate-800">
                : 13 Juli 2024
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
