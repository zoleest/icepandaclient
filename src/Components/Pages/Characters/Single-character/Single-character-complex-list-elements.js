import parse from 'html-react-parser';

function SingleCharacterComplexListElements(props) {


    return (<div>
        <li>
            <h5>{props.value.fieldName}</h5>
            <div>{parse(props.value.fieldDescription)}</div>
        </li>
    </div>);
}

export default SingleCharacterComplexListElements;