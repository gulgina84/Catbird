import React, { useEffect } from 'react';
import { Col, Row, Container, Image, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setStyle } from '../../redux/actions/productAction';

function StyleSelector(props) {
  const widget = 'style-selector';
  const styles = useSelector((state) => state.styles.results);
  const style = useSelector((state) => state.style);
  const dispatch = useDispatch();

  const styleComponents = () => {
    var rows = [];
    for (var i = 0; i < styles.length; i += 4) {
      var row = [];
      row.push(styles.slice(i, i+4).map((style, index) => {
        return (
        <div key={index} style={{display: 'inline-block'}}>
          <input type="radio" name="style" id={style.style_id} onClick={() => {dispatch(setStyle(style))}}/>
          <label className="form-check-label">
          <Image key={style.style_id} className="style-thumbnail" src={style.photos[0].thumbnail_url} style_id={style.style_id} width="50px" height="50px"  onClick={e => {props.handleInteractions(e.target.className, widget)}} roundedCircle/>
          </label>
        </div>)
     }))
     rows.push(row.map((item, index) => {return <div key={index}>{item}</div>}))
    }
    return rows;
  }

  return (
    <Container>
      <span className="style-name">
        <strong>STYLE > </strong> {style.name}
      </span>
        {styleComponents()}
    </Container>
  )
}

export default StyleSelector;