import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Stories } from 'src/app/model/stories';
import { AlertifyService } from 'src/app/services/alertify.service';
import { StoryService } from 'src/app/services/Story.service';

@Component({
  selector: 'app-addstories',
  templateUrl: './addstories.component.html',
  styleUrls: ['./addstories.component.css']
})
export class AddstoriesComponent implements OnInit {

  story = new Stories();
  storyId:number;
  constructor(private storyService: StoryService, private router: Router, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get("id")) {
      this.storyId = +this.route.snapshot.params["id"];
      this.storyService.getStorybyId(this.storyId).subscribe((data: any) => {
        this.story.videoTitle = data.videoTitle;
        this.story.visible = data.visible;
        this.story.videoUrl = data.videoUrl;
      })
    }
  }

  AddStories(story: NgForm) {
    this.story.videoTitle = story.control.get('videoTitle').value;
    this.story.videoUrl = story.control.get('videoUrl').value;
    this.story.visible = story.control.get('visible').value;

    if (this.route.snapshot.paramMap.get("id")) {
      // Update Stories
      this.story.id = +this.route.snapshot.params["id"];
      this.storyService.updateStory(this.story).subscribe(data => {
        this.alertify.success("Story Updated Successfully");
        this.router.navigate(['/admin/story']);
      })
    }
    else {
      // Add Stories
      this.storyService.addStory(this.story).subscribe(data => {
        this.alertify.success("Story Added Successfully");
        this.router.navigate(['/admin/story']);
      })
    }
  }
}
