import { User } from "@nextui-org/react";
import { Leaderboard } from "../models/Leaderboard.model";

export default function RankTable({ columnNames, data }: {
  columnNames: string[],
  data: Leaderboard[]
}) {
  return (
    <table className="w-full overflow-hidden table-auto ">
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
                    name={row.user.name}
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


