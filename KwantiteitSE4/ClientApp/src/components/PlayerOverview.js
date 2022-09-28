import { Avatar, Divider, List, Skeleton } from 'antd';
import { React, Component, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import './PlayerOverview.css';

const [loading, setLoading] = useState(false);
const [data, setData] = useState([]);
const loadMoreData = () => {
  if (loading) {
    return;
  }

    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

export class PlayerOverview extends Component {  
  static displayName = PlayerOverview.name;

  render () {
    return (
      <div className='playeroverview'>
        <div className='playeroverview__playerList'>
          <div
            id="scrollableDiv"
            style={{
              height: 400,
              overflow: 'auto',
              padding: '0 16px',
              border: '1px solid rgba(140, 140, 140, 0.35)'
            }}
          >
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={data.length < 50}
            loader={
              <Skeleton
                avatar
                paragraph={{
                  rows: 1
                }}
                active
              />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
              <div>Content</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
            {/* <ul>
                    <li className='playeroverview__playerListTitle'><h4>Players</h4></li>
                <li>Player 1
                    <Link className='playeroverview__playerlist__PlayerEdit' to='/PlayerEditor'>
                        <img className='playeroverview__playerlist__playeredit__logo' src="https://cdn.iconscout.com/icon/free/png-256/edit-1780339-1517827.png"/>
                    </Link>
                </li>
                <li>Player 2</li>
                <li>Player 3</li>
            </ul> */}
        </div>
        <div className='playeroverview__info'>
            <img className='playeroverview__info__image' src='https://gogeticon.net/files/1925428/fa0cbc2764f70113bf2fad3905933545.png' />
            <div className='playeroverview__info__data'>
                <table>
                    <tr>
                        <th>Player Name</th>
                    </tr>
                    <tr>
                        <td>Age</td>
                        <td>###</td>
                    </tr>
                    <tr>
                        <td>Matches Won</td>
                        <td>###</td>
                    </tr>
                    <tr>
                        <td>Average Score</td>
                        <td>###</td>
                    </tr>
                </table>
            </div>
        </div>
      </div>
    );
  }
}
