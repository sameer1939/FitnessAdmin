import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Stories } from 'src/app/model/stories';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StoryService } from 'src/app/services/Story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  storyList: Array<Stories>=[];
  constructor(private storyService: StoryService,
    private alertify: AlertifyService,private router: Router) { }

  ngOnInit(): void {
    this.bindStory();
  }

  bindStory() {
    this.storyService.bindStory().subscribe((data: Stories[]) => {
      this.storyList = data;
    });
  }

  EditStory(id){
    this.router.navigate(["/admin/addstory/" + id]);
  }
  deleteStory(id){
    this.alertify.confirm(
      "Warning",
      "Are you sure you want to delete this Story",
      () => {
        this.storyService.deleteStory(id).subscribe(() => {
          this.alertify.error("Story Deleted Successfully");
          this.bindStory();
        });
      },
      () => {
        console.log("cancel deleted");
      }
    );
  }
}
