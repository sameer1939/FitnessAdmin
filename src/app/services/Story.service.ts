import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Stories } from '../model/stories';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  baseUrl = environment.BaseUrl;
  constructor(private http: HttpClient) { }

  bindStory(){
    return this.http.get(this.baseUrl+"stories/bindStories");
  }

  getStorybyId(id) {
    return this.http.get(this.baseUrl + "stories/storyById/" + id);
  }

  // Add Story
  addStory(stories: Stories) {
    return this.http.post(this.baseUrl + "stories/add", stories);
  }

  // delete story
  deleteStory(id){
    return this.http.delete(this.baseUrl+"stories/deleteStory/"+id);
  }

  // update story
  updateStory(stories: Stories) {
    return this.http.put(this.baseUrl + "stories/update", stories)
  }
}
