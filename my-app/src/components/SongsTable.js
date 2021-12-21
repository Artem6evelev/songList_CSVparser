import React, { useEffect, useState } from "react";
import axios from "axios";
import * as ReactBootStrap from "react-bootstrap";

const SongsTable = () => {
  const [songs, setSongs] = useState({ artistlist: [] });

  useEffect(() => {
    const fetchSongsList = async () => {
      const { data } = await axios("http://localhost:4000/getAllSongs");

      setSongs({ artistlist: data });
    //   console.log(data);
    };
    fetchSongsList();
  }, [setSongs]);

  return (
    <div>
      <ReactBootStrap.Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Song name</th>
            <th>Artist</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {songs.artistlist &&
            songs.artistlist.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.artist}</td>
                <td>{item.year}</td>
              </tr>
            ))}
        </tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default SongsTable;
