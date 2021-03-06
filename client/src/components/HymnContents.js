import React, { Component } from "react";
import { Link } from "react-router-dom"
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class HymnContents extends Component {
    render() {
        // 두 개 이상의 컴포넌트는 div로 묶어야
        return (
            <TableRow>
                <TableCell>{this.props.page}</TableCell>
                <TableCell><Link
                    to={`/hymnPlay/${this.props.page}`}
                    state={{
                        page: this.props.page,
                        title: this.props.title,
                        verses: this.props.verses,
                        lyric_kr: this.props.lyric_kr,
                        lyric_en: this.props.lyric_en,
                        lyric_jp: this.props.lyric_jp,
                        length: this.props.length
                    }}>{this.props.title}</Link></TableCell>
                <TableCell>{this.props.verses}</TableCell>
                <TableCell>{this.props.length}</TableCell>
            </TableRow>
        )
    }
}

export default HymnContents