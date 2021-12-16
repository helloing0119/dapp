import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';
import { PermissionConst } from '../../utils/Consts';
import FileListItem from '../items/FileListItem';
import PropTypes from 'prop-types';
import { CommitText } from '../utils/Languages';

const propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      objectId: PropTypes.number,
      name: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
      uploaded: PropTypes.string,
      rev: PropTypes.string,
      msg: PropTypes.string,
      permission: PropTypes.oneOf(Object.values(PermissionConst)),
      owner: PropTypes.string
    })
  ),
  onSelectFile: PropTypes.func.isRequired,
  onDeselectFile: PropTypes.func.isRequired
};

const defaultProps = {
  commitFlag: false
};

export default class FileList extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: -1 };
    this.handleSelectFile = this.handleSelectFile.bind(this);
  }

  handleSelectFile(value) {
    if(this.state.selected == value.objectId) {
      this.setState({ selected: -1});
      this.props.onDeselectFile();
    }
    else {
      this.setState({ selected: value.objectId });
      this.props.onSelectFile(value);
    }
  }

  render() {
    const selectedItem = this.state.selected;
    const commitFlag = this.props.commitFlag;
    const items = this.props.files.map((value) =>
      <FileListItem
        selected={selectedItem == value.objectId}
        commitFlag={commitFlag}
        objectId={value.objectId}
        name={value.name}
        type={value.type}
        size={value.size}
        uploaded={value.uploaded}
        rev={value.rev}
        owner={value.owner}
        onClick={(() => this.handleSelectFile(value)).bind(this)}
        permission={value.permission}
        msg={value.msg}
      />
    );

    return <ListGroup>
      <ListGroup.Item>
        <div className="FileList-item-content">
          <Table>
            <tbody>
              <tr>
                <td colSpan="3">{CommitText.Korean["name"]}</td>
                <td>{CommitText.Korean["owner"]}</td>
                <td colSpan="2">{CommitText.Korean["uploaded"]}</td>
                <td>{CommitText.Korean["size"]}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </ListGroup.Item>;
      {items}
    </ListGroup>;
  }
};

FileList.propTypes = propTypes;
FileList.defaultProps = defaultProps;