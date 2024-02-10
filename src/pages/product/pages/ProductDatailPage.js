import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Table } from '@mui/material';
// import { Add, Delete } from '@mui/icons-material'; // Material-UI icons

export default function ProductDatailPage() {
  const [data, setData] = useState([
    {
      id: 1,
      rname: 'Massala Theoryy',
      imgdata:
        'https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp',
      address: 'North Indian, Biryani, Mughlai',
      delimg: 'https://b.zmtcdn.com/data/o2_assets/0b07ef18234c6fdf9365ad1c274ae0631612687510.png?output-format=webp',
      somedata: ' 1175 + order placed from here recently',
      price: 350,
      rating: '3.8',
      arrimg: 'https://b.zmtcdn.com/data/o2_assets/4bf016f32f05d26242cea342f30d47a31595763089.png?output-format=webp',
      qnty: 0,
    },
  ]);
  const dispatch = useDispatch();
  const { id } = useParams();
  //   const history = useHistory();

  const compare = () => {
    // let comparedata = getdata.filter((e) => e.id === id);
    // setData(comparedata);
  };

  const send = (e) => {
    // dispatch(ADD(e));
  };

  const dlt = (id) => {
    // dispatch(DLT(id));
    // history.push('/');
  };

  const remove = (item) => {
    // dispatch(REMOVE(item));
  };

  //   useEffect(() => {
  //     compare();
  //   }, [id]);

  return (
    <>
      <div className="container mt-2">
        <h2 className="text-center">Item Details page</h2>
        <section className="container mt-3">
          <div className="">
            {data.map((ele) => (
              <div key={ele.id} style={{ display: 'flex' }}>
                <div>
                  {' '}
                  <img src={ele.imgdata} alt="" />
                </div>
                <div className="">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant:</strong> {ele?.rname}
                          </p>
                          <p>
                            <strong>Price:</strong> {ele?.price}
                          </p>
                          <p>
                            <strong>Dishes:</strong> {ele?.address}
                          </p>
                          <p>
                            <strong>Total:</strong> ₹ {ele?.price * ele?.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-item-center"
                            style={{ width: 100, cursor: 'pointer', background: '#ddd', color: '#111' }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              //   onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}
                            >
                              {' '}
                              -{' '}
                            </span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              // onClick={() => send(ele)}
                            >
                              {' '}
                              +{' '}
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating:</strong>{' '}
                            <span
                              style={{ background: 'green', color: '#fff', padding: '2px 5px', borderRadius: '5px' }}
                            >
                              {ele?.rating} ★
                            </span>
                          </p>
                          <p>
                            <strong>Order Review:</strong> <span> {ele?.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove :</strong> <span> {/* <Delete onClick={() => dlt(ele?.id)} /> */}</span>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
