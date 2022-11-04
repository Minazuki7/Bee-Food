import { useOrderStats } from "@requests/order";

import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
interface chartProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}
const Stats = () => {
  const data = useOrderStats();
  const items = data.data?.getStats.items;
  const menus = data.data?.getStats.menus;
  const clients = data.data?.getStats.clients;
  const branchs = data.data?.getStats.branchs;
  const COLORS = [
    "#3F3A81",
    "#2F57AB",
    "#6581BF",
    "#954698",
    "#D65A94",
    "#F76385",
    "#F9B357",
    "#F8F658",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: chartProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <div className="grid grid-cols-2 gap-4 ml-28 mt-11">
      <div style={{ width: "400px", height: "400px" }}>
        <div className=" flex justify-center font-bold text-2xl"> Items:</div>
        {data.data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={300}>
              <Pie
                data={items}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={175}
                fill="#8884d8"
                dataKey="occurrence"
              >
                {items.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <div className=" flex justify-center font-bold text-2xl"> Menus:</div>
        {data.data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={300}>
              <Pie
                data={menus}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={175}
                fill="#8884d8"
                dataKey="occurrence"
              >
                {items.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <div className=" flex justify-center font-bold text-2xl">
          {" "}
          Branches:
        </div>
        {data.data && (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={300} height={300}>
              <Pie
                data={branchs}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={175}
                fill="#8884d8"
                dataKey="occurrence"
              >
                {items.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div style={{ width: "400px", height: "400px" }}>
        <div className=" flex justify-center font-bold text-2xl"> Clients:</div>
        {data.data && (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={clients}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="occurrence" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};
export default Stats;
