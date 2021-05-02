import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDocuments } from '../store/actions/documentActions';
import { DetailsList, DetailsListLayoutMode, mergeStyleSets, Selection, SelectionMode, IColumn, TextField } from '@fluentui/react';

const container = {
    margin: '15vh',
};

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
    },
});
const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px',
    },
};

class DocumentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            columns: []
        };

        props.fetchDocuments().then((data) => {
            console.log(data);
            if (data.length !== 0) {
                this.setState({
                    items: _generateDocuments(data),
                    columns: [
                        {
                            key: 'column1',
                            name: 'File Type',
                            className: classNames.fileIconCell,
                            iconClassName: classNames.fileIconHeaderIcon,
                            ariaLabel: 'Column operations for File type, Press to sort on File type',
                            iconName: 'Page',
                            isIconOnly: true,
                            fieldName: 'name',
                            minWidth: 16,
                            maxWidth: 16,
                        },
                        {
                            key: 'column2',
                            name: 'Name',
                            fieldName: 'name',
                            minWidth: 210,
                            maxWidth: 350,
                            isRowHeader: true,
                            isResizable: true,
                            isSorted: true,
                            isSortedDescending: false,
                            sortAscendingAriaLabel: 'Sorted A to Z',
                            sortDescendingAriaLabel: 'Sorted Z to A',
                            data: 'string',
                            isPadded: true,
                        },
                        {
                            key: 'column3',
                            name: 'Date Modified',
                            fieldName: 'dateModifiedValue',
                            minWidth: 70,
                            maxWidth: 90,
                            isResizable: true,
                            data: 'number',
                            onRender: (item) => {
                                return <span>{item.dateModified}</span>;
                            },
                            isPadded: true,
                        },
                        {
                            key: 'column4',
                            name: 'Modified By',
                            fieldName: 'modifiedBy',
                            minWidth: 70,
                            maxWidth: 90,
                            isResizable: true,
                            isCollapsible: true,
                            data: 'string',
                            onColumnClick: this._onColumnClick,
                            onRender: (item) => {
                                return <span>{item.modifiedBy}</span>;
                            },
                            isPadded: true,
                        },
                        {
                            key: 'column5',
                            name: 'File Size',
                            fieldName: 'fileSizeRaw',
                            minWidth: 70,
                            maxWidth: 90,
                            isResizable: true,
                            isCollapsible: true,
                            data: 'number',
                            onColumnClick: this._onColumnClick,
                            onRender: (item) => {
                                return <span>{item.fileSize}</span>;
                            },
                        },
                    ]
                });
            }
        });
    }
    render() {
        const { columns, isCompactMode, items } = this.state;
        return (
            <div style={container}>
                <TextField label="Filter by name:" onChange={this._onChangeText} styles={controlStyles} />
                <DetailsList
                    items={items}
                    compact={isCompactMode}
                    columns={columns}
                    selectionMode={SelectionMode.none}
                    getKey={this._getKey}
                    setKey="none"
                    layoutMode={DetailsListLayoutMode.justified}
                    isHeaderVisible={true}
                    onItemInvoked={this._onItemInvoked}
                />
                <Link to="/">Go Back</Link>
            </div>
        );
    }
}

function _generateDocuments(data) {
    const items = [];
    data = [];
    if (data.length !== 0) {
        data.forEach((val, i) => {
            const randomDate = val.date;
            const randomFileSize = val.fileSize;
            const randomFileType = _randomFileIcon(val.name.split['.'][1]);
            let fileName = val.name;
            let userName = val.name;
            items.push({
                key: i.toString(),
                name: fileName,
                value: fileName,
                iconName: randomFileType.url,
                fileType: randomFileType.docType,
                modifiedBy: userName,
                dateModified: randomDate.dateFormatted,
                dateModifiedValue: randomDate.value,
                fileSize: randomFileSize.value,
                fileSizeRaw: randomFileSize.rawSize,
            });
        });
    }
    return items;
}

// const FILE_ICONS = [
//     { name: 'accdb' },
//     { name: 'audio' },
//     { name: 'code' },
//     { name: 'csv' },
//     { name: 'docx' },
//     { name: 'dotx' },
//     { name: 'mpp' },
//     { name: 'mpt' },
//     { name: 'model' },
//     { name: 'one' },
//     { name: 'onetoc' },
//     { name: 'potx' },
//     { name: 'ppsx' },
//     { name: 'pdf' },
//     { name: 'photo' },
//     { name: 'pptx' },
//     { name: 'presentation' },
//     { name: 'potx' },
//     { name: 'pub' },
//     { name: 'rtf' },
//     { name: 'spreadsheet' },
//     { name: 'txt' },
//     { name: 'vector' },
//     { name: 'vsdx' },
//     { name: 'vssx' },
//     { name: 'vstx' },
//     { name: 'xlsx' },
//     { name: 'xltx' },
//     { name: 'xsn' },
// ];

function _randomFileIcon(fileType) {
    // const docType = FILE_ICONS[Math.floor(Math.random() * FILE_ICONS.length)].name;
    return {
        fileType,
        url: `https://static2.sharepointonline.com/files/fabric/assets/item-types/16/${fileType}.svg`,
    };
}

const mapStateToProps = (state) => ({ docs: state.docs });

export default connect(mapStateToProps, { fetchDocuments })(DocumentList);