import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Brush
} from "recharts";

function Graph({chartData}) {

return (
    <div style={{height:'100%', width:'100%'}}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
          // labels the depature dates on x axis
            dataKey="date"
            label={{ value: "Departure Date", position: "insideBottom", offset: -5 }}
          />

          <YAxis
          // labels the depature date on y axis
            tickFormatter={(value) => `€${value}`}
            label={{ value: "Price (EUR) for 1", angle: -90, position: "insideLeft" }}
          />

          {/* 🔥 TOOLTIP WITH AIRLINE NAME */}
          <Tooltip
          // this returns information on the hover div
            formatter={(value) => [`€${value}`, "Lowest Price"]}
            labelFormatter={(value) => `Date: ${value}`}
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;
              const data = payload[0].payload;

              return (
                // all this iformation below is from the chartData variable
                <div style={{ background: "#fff", padding: 10, border: "1px solid #ccc" }}>
                  <div><b>Date:</b> {label}</div> {/** depature date */}
                  <div><b>Airline:</b> {data.airline}</div> {/** airline name */}
                  <div><b>Lowest Price:</b> €{data.price}</div>{/** lowest price */}
                  <div><b>Departure Time:</b> {data.departureTime}</div> {/** time it jet takes off */}
                </div>
              );
            }}
          />
           <Brush dataKey="name" height={20} stroke="#8884d8" />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            fill="#93c5fd"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Graph;
