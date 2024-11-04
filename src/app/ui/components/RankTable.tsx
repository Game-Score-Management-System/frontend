"use client";
import { User } from "@nextui-org/react";
import { useGetLeaderboardQuery } from "@/store/services/apiSlice";

export default function RankTable({ columnNames }: {
  columnNames: string[],
}) {

  const { data, isLoading } = useGetLeaderboardQuery({ limit: 10, page: 1, game: 'Pacman' });

  if (!data || isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-sky-100"></div>
      </div>
    )
  }


  return (
    <table className="w-full overflow-hidden table-auto">
      <thead className="text-xs text-white uppercase font-sweater bg-black/60">
        <tr>
          {columnNames.map((columnName, index) => (
            <th key={index} className="py-3.5 pl-4 pr-3 text-center text-white sm:pl-6">{columnName}</th>
          ))}
        </tr>
      </thead>
      <tbody>

        {data.map((row, index) => {
          const position = index + 1;
          return (
            <tr key={index} className={index % 2 === 0 ? "bg-[#104155]" : "bg-[#28d15863]"}>
              <td className="py-2 pl-4 pr-3 text-2xl text-center  text-slate-300 whitespace-nowrap sm:pl-6">
                {position === 1 && (
                  <span className="text-4xl text-sky-100">🥇</span>
                )}
                {position === 2 && (
                  <span className="text-4xl text-sky-100">🥈</span>
                )}
                {position === 3 && (
                  <span className="text-4xl text-sky-100">🥉</span>
                )}
                <span className="text-3xl text-sky-100">{position > 3 && position}</span>

              </td>
              <td className="py-2 pl-4 pr-3 text-base whitespace-nowrap sm:pl-6">
                <div className="flex items-center gap-4 text-sky-100">
                  <User
                    avatarProps={{ isBordered: true, src: row.user.profilePicture, className: 'bg-slate-100/20' }}
                    className="transition-transform"
                    name={
                      <p className="grid grid-rows-2 items-center ms-1">
                        {row.user.username}
                        <span className="text-xs text-slate-300">{row.user.name}</span>
                      </p>
                    }
                  />
                </div>
              </td>
              <td className="px-3 py-4 text-lg text-center text-slate-300 whitespace-nowrap">{row.score}</td>
            </tr>
          )
        })}

      </tbody>

    </table>
  )
}


