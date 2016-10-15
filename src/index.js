import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoDetail from './components/VideoDetail';

const API_KEY = 'AIzaSyAhrIX6cySzQVYmPJji-aEd8Z1tTo3-I_0';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <div className="row">
                    <SearchBar onSearchTermChange={videoSearch}/>
                </div>
                <div className="row">
                    <VideoDetail video={this.state.selectedVideo}/>
                    <VideoList
                        onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos={this.state.videos}/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));