import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Paging } from '../shared/paging';
import { Kitty } from '../shared/models/kitty.model';
import { KittyDetailComponent } from '../shared/kitty_detail/kitty_detail.component';
import { KittiesService } from '../shared/kitties.service';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  kitties: Array<object>;
  page: number = 1;
  per_page: number = 9;
  count: number = 0;
  isLoading: boolean;
  filter: Array<any> = [];
  traits: Array<any>;

  api_traits: any = {
     "breed" : {
      "3" : {
         "icon" : "/v1/trait_image/tail_attr/fire",
         "displayName" : "fire"
      },
      "8" : {
         "displayName" : "sharp",
         "icon" : "/v1/trait_image/tail_attr/sharp"
      },
      "1" : {
         "displayName" : "comma",
         "icon" : "/v1/trait_image/tail_attr/comma"
      },
      "0" : {
         "displayName" : "chipmunk",
         "icon" : "/v1/trait_image/tail_attr/chipmunk"
      },
      "2" : {
         "icon" : "/v1/trait_image/tail_attr/cub",
         "displayName" : "cub"
      },
      "7" : {
         "displayName" : "rainbow",
         "icon" : "/v1/trait_image/tail_attr/rainbow"
      },
      "4" : {
         "displayName" : "fluffy",
         "icon" : "/v1/trait_image/tail_attr/fluffy"
      },
      "6" : {
         "displayName" : "jerboa",
         "icon" : "/v1/trait_image/tail_attr/jerboa"
      },
      "5" : {
         "displayName" : "hare",
         "icon" : "/v1/trait_image/tail_attr/hare"
      },
      "9" : {
         "displayName" : "squirrel",
         "icon" : "/v1/trait_image/tail_attr/squirrel"
      }
   },
   "body_pattern" : {
      "9" : {
         "icon" : "/v1/trait_image/body_pattern/striped",
         "displayName" : "striped"
      },
      "4" : {
         "displayName" : "pettyBig",
         "icon" : "/v1/trait_image/body_pattern/pettyBig"
      },
      "6" : {
         "displayName" : "reptilian",
         "icon" : "/v1/trait_image/body_pattern/reptilian"
      },
      "5" : {
         "icon" : "/v1/trait_image/body_pattern/pettySmall",
         "displayName" : "pettySmall"
      },
      "11" : {
         "icon" : "/v1/trait_image/body_pattern/wildfire",
         "displayName" : "wildfire"
      },
      "7" : {
         "displayName" : "seed",
         "icon" : "/v1/trait_image/body_pattern/seed"
      },
      "2" : {
         "displayName" : "fern",
         "icon" : "/v1/trait_image/body_pattern/fern"
      },
      "1" : {
         "displayName" : "dalmatian",
         "icon" : "/v1/trait_image/body_pattern/dalmatian"
      },
      "10" : {
         "displayName" : "tropical",
         "icon" : "/v1/trait_image/body_pattern/tropical"
      },
      "0" : {
         "displayName" : "candle",
         "icon" : "/v1/trait_image/body_pattern/candle"
      },
      "8" : {
         "displayName" : "spotted",
         "icon" : "/v1/trait_image/body_pattern/spotted"
      },
      "3" : {
         "displayName" : "ornament",
         "icon" : "/v1/trait_image/body_pattern/ornament"
      }
   },
   "eye_attr" : {
      "11" : {
         "icon" : "/v1/trait_image/eye_attr/surprised",
         "displayName" : "surprised"
      },
      "7" : {
         "icon" : "/v1/trait_image/eye_attr/pretty",
         "displayName" : "pretty"
      },
      "2" : {
         "icon" : "/v1/trait_image/eye_attr/cunning",
         "displayName" : "cunning"
      },
      "9" : {
         "displayName" : "strong",
         "icon" : "/v1/trait_image/eye_attr/strong"
      },
      "5" : {
         "displayName" : "persistent",
         "icon" : "/v1/trait_image/eye_attr/persistent"
      },
      "4" : {
         "displayName" : "indifferent",
         "icon" : "/v1/trait_image/eye_attr/indifferent"
      },
      "6" : {
         "displayName" : "pleasant",
         "icon" : "/v1/trait_image/eye_attr/pleasant"
      },
      "3" : {
         "displayName" : "faithful",
         "icon" : "/v1/trait_image/eye_attr/faithful"
      },
      "0" : {
         "icon" : "/v1/trait_image/eye_attr/ardent",
         "displayName" : "ardent"
      },
      "10" : {
         "icon" : "/v1/trait_image/eye_attr/stupid",
         "displayName" : "stupid"
      },
      "1" : {
         "displayName" : "astonished",
         "icon" : "/v1/trait_image/eye_attr/astonished"
      },
      "8" : {
         "icon" : "/v1/trait_image/eye_attr/strict",
         "displayName" : "strict"
      }
   },
   "ear_attr" : {
      "4" : {
         "displayName" : "infernal",
         "icon" : "/v1/trait_image/ear_attr/infernal"
      },
      "6" : {
         "icon" : "/v1/trait_image/ear_attr/tiger",
         "displayName" : "tiger"
      },
      "5" : {
         "icon" : "/v1/trait_image/ear_attr/pork",
         "displayName" : "pork"
      },
      "2" : {
         "displayName" : "gremlin",
         "icon" : "/v1/trait_image/ear_attr/gremlin"
      },
      "7" : {
         "icon" : "/v1/trait_image/ear_attr/vinny",
         "displayName" : "vinny"
      },
      "1" : {
         "displayName" : "default",
         "icon" : "/v1/trait_image/ear_attr/default"
      },
      "0" : {
         "icon" : "/v1/trait_image/ear_attr/canine",
         "displayName" : "canine"
      },
      "8" : {
         "icon" : "/v1/trait_image/ear_attr/wolfish",
         "displayName" : "wolfish"
      },
      "3" : {
         "icon" : "/v1/trait_image/ear_attr/husky",
         "displayName" : "husky"
      }
   },
   "body_attr" : {
      "2" : {
         "displayName" : "doubleBun",
         "icon" : "/v1/trait_image/body_attr/doubleBun"
      },
      "3" : {
         "icon" : "/v1/trait_image/body_attr/ponytail",
         "displayName" : "ponytail"
      },
      "0" : {
         "icon" : "/v1/trait_image/body_attr/bonfireA",
         "displayName" : "bonfireA"
      },
      "1" : {
         "icon" : "/v1/trait_image/body_attr/bonfireB",
         "displayName" : "bonfireB"
      }
   },
   "nose_attr" : {
      "10" : {
         "icon" : "/v1/trait_image/nose_attr/boxy",
         "displayName" : "boxy"
      },
      "1" : {
         "icon" : "/v1/trait_image/nose_attr/avian",
         "displayName" : "avian"
      },
      "0" : {
         "icon" : "/v1/trait_image/nose_attr/buckteeth",
         "displayName" : "buckteeth"
      },
      "8" : {
         "icon" : "/v1/trait_image/nose_attr/normal",
         "displayName" : "normal"
      },
      "3" : {
         "icon" : "/v1/trait_image/nose_attr/dozy",
         "displayName" : "dozy"
      },
      "9" : {
         "icon" : "/v1/trait_image/nose_attr/tart",
         "displayName" : "tart"
      },
      "4" : {
         "icon" : "/v1/trait_image/nose_attr/gamine",
         "displayName" : "gamine"
      },
      "6" : {
         "icon" : "/v1/trait_image/nose_attr/hipster",
         "displayName" : "hipster"
      },
      "5" : {
         "displayName" : "glad",
         "icon" : "/v1/trait_image/nose_attr/glad"
      },
      "2" : {
         "icon" : "/v1/trait_image/nose_attr/cheshire",
         "displayName" : "cheshire"
      },
      "7" : {
         "icon" : "/v1/trait_image/nose_attr/humble",
         "displayName" : "humble"
      },
      "11" : {
         "displayName" : "tusk",
         "icon" : "/v1/trait_image/nose_attr/tusk"
      }
   },
   "tail_attr" : {
      "3" : {
         "icon" : "/v1/trait_image/tail_attr/fire",
         "displayName" : "fire"
      },
      "8" : {
         "displayName" : "sharp",
         "icon" : "/v1/trait_image/tail_attr/sharp"
      },
      "1" : {
         "displayName" : "comma",
         "icon" : "/v1/trait_image/tail_attr/comma"
      },
      "0" : {
         "displayName" : "chipmunk",
         "icon" : "/v1/trait_image/tail_attr/chipmunk"
      },
      "2" : {
         "icon" : "/v1/trait_image/tail_attr/cub",
         "displayName" : "cub"
      },
      "7" : {
         "displayName" : "rainbow",
         "icon" : "/v1/trait_image/tail_attr/rainbow"
      },
      "4" : {
         "displayName" : "fluffy",
         "icon" : "/v1/trait_image/tail_attr/fluffy"
      },
      "6" : {
         "displayName" : "jerboa",
         "icon" : "/v1/trait_image/tail_attr/jerboa"
      },
      "5" : {
         "displayName" : "hare",
         "icon" : "/v1/trait_image/tail_attr/hare"
      },
      "9" : {
         "displayName" : "squirrel",
         "icon" : "/v1/trait_image/tail_attr/squirrel"
      }
   },
   "body_color_a" : {
      "0" : {
         "icon" : "/v1/trait_image/body_color_a/lightCyan",
         "displayName" : "lightCyan"
      },
      "1" : {
         "icon" : "/v1/trait_image/body_color_a/lightGray",
         "displayName" : "lightGray"
      },
      "8" : {
         "displayName" : "white",
         "icon" : "/v1/trait_image/body_color_a/white"
      },
      "3" : {
         "displayName" : "moccasin",
         "icon" : "/v1/trait_image/body_color_a/moccasin"
      },
      "9" : {
         "icon" : "/v1/trait_image/body_color_a/yellowlight",
         "displayName" : "yellowlight"
      },
      "5" : {
         "displayName" : "paleTurquoise",
         "icon" : "/v1/trait_image/body_color_a/paleTurquoise"
      },
      "4" : {
         "displayName" : "paleBlue",
         "icon" : "/v1/trait_image/body_color_a/paleBlue"
      },
      "6" : {
         "icon" : "/v1/trait_image/body_color_a/powderGrass",
         "displayName" : "powderGrass"
      },
      "7" : {
         "icon" : "/v1/trait_image/body_color_a/thistlePale",
         "displayName" : "thistlePale"
      },
      "2" : {
         "icon" : "/v1/trait_image/body_color_a/mistyRose",
         "displayName" : "mistyRose"
      }
   },
   "body_color_b" : {
      "12" : {
         "icon" : "/v1/trait_image/body_color_b/rosyBrown",
         "displayName" : "rosyBrown"
      },
      "17" : {
         "displayName" : "springGreen",
         "icon" : "/v1/trait_image/body_color_b/springGreen"
      },
      "13" : {
         "displayName" : "sandyBrown",
         "icon" : "/v1/trait_image/body_color_b/sandyBrown"
      },
      "8" : {
         "displayName" : "limeLight",
         "icon" : "/v1/trait_image/body_color_b/limeLight"
      },
      "0" : {
         "displayName" : "aqua",
         "icon" : "/v1/trait_image/body_color_b/aqua"
      },
      "14" : {
         "icon" : "/v1/trait_image/body_color_b/sienna",
         "displayName" : "sienna"
      },
      "2" : {
         "icon" : "/v1/trait_image/body_color_b/babyBlue",
         "displayName" : "babyBlue"
      },
      "22" : {
         "icon" : "/v1/trait_image/body_color_b/thistlePale",
         "displayName" : "thistlePale"
      },
      "24" : {
         "icon" : "/v1/trait_image/body_color_b/yellow",
         "displayName" : "yellow"
      },
      "6" : {
         "displayName" : "gray",
         "icon" : "/v1/trait_image/body_color_b/gray"
      },
      "9" : {
         "icon" : "/v1/trait_image/body_color_b/linenDark",
         "displayName" : "linenDark"
      },
      "18" : {
         "displayName" : "steelBlue",
         "icon" : "/v1/trait_image/body_color_b/steelBlue"
      },
      "20" : {
         "displayName" : "steelPale",
         "icon" : "/v1/trait_image/body_color_b/steelPale"
      },
      "15" : {
         "displayName" : "silver",
         "icon" : "/v1/trait_image/body_color_b/silver"
      },
      "3" : {
         "icon" : "/v1/trait_image/body_color_b/burntSiennaDark",
         "displayName" : "burntSiennaDark"
      },
      "1" : {
         "displayName" : "aquamarineDark",
         "icon" : "/v1/trait_image/body_color_b/aquamarineDark"
      },
      "23" : {
         "icon" : "/v1/trait_image/body_color_b/vermilionDark",
         "displayName" : "vermilionDark"
      },
      "10" : {
         "icon" : "/v1/trait_image/body_color_b/peruPale",
         "displayName" : "peruPale"
      },
      "11" : {
         "icon" : "/v1/trait_image/body_color_b/princessPink",
         "displayName" : "princessPink"
      },
      "7" : {
         "icon" : "/v1/trait_image/body_color_b/jade",
         "displayName" : "jade"
      },
      "21" : {
         "displayName" : "thistle",
         "icon" : "/v1/trait_image/body_color_b/thistle"
      },
      "5" : {
         "displayName" : "grasslight",
         "icon" : "/v1/trait_image/body_color_b/grasslight"
      },
      "16" : {
         "icon" : "/v1/trait_image/body_color_b/springDark",
         "displayName" : "springDark"
      },
      "4" : {
         "displayName" : "burntSiennaLight",
         "icon" : "/v1/trait_image/body_color_b/burntSiennaLight"
      },
      "19" : {
         "displayName" : "steelGray",
         "icon" : "/v1/trait_image/body_color_b/steelGray"
      }
   },
   "body_color_c" : {
      "6" : {
         "icon" : "/v1/trait_image/body_color_c/gray",
         "displayName" : "gray"
      },
      "9" : {
         "icon" : "/v1/trait_image/body_color_c/mediumPurple",
         "displayName" : "mediumPurple"
      },
      "22" : {
         "icon" : "/v1/trait_image/body_color_c/springGreen",
         "displayName" : "springGreen"
      },
      "2" : {
         "icon" : "/v1/trait_image/body_color_c/boldKhaki",
         "displayName" : "boldKhaki"
      },
      "8" : {
         "icon" : "/v1/trait_image/body_color_c/khaki",
         "displayName" : "khaki"
      },
      "13" : {
         "displayName" : "royalBlue",
         "icon" : "/v1/trait_image/body_color_c/royalBlue"
      },
      "14" : {
         "icon" : "/v1/trait_image/body_color_c/slateBlue",
         "displayName" : "slateBlue"
      },
      "0" : {
         "icon" : "/v1/trait_image/body_color_c/blue",
         "displayName" : "blue"
      },
      "12" : {
         "displayName" : "pink",
         "icon" : "/v1/trait_image/body_color_c/pink"
      },
      "17" : {
         "icon" : "/v1/trait_image/body_color_c/yellowGreen",
         "displayName" : "yellowGreen"
      },
      "4" : {
         "displayName" : "darkOrange",
         "icon" : "/v1/trait_image/body_color_c/darkOrange"
      },
      "16" : {
         "icon" : "/v1/trait_image/body_color_c/vermilionBold",
         "displayName" : "vermilionBold"
      },
      "5" : {
         "icon" : "/v1/trait_image/body_color_c/gold",
         "displayName" : "gold"
      },
      "19" : {
         "icon" : "/v1/trait_image/body_color_c/princessPink",
         "displayName" : "princessPink"
      },
      "11" : {
         "icon" : "/v1/trait_image/body_color_c/peru",
         "displayName" : "peru"
      },
      "7" : {
         "displayName" : "hotPink",
         "icon" : "/v1/trait_image/body_color_c/hotPink"
      },
      "21" : {
         "icon" : "/v1/trait_image/body_color_c/purpleLight",
         "displayName" : "purpleLight"
      },
      "1" : {
         "displayName" : "blueViolet",
         "icon" : "/v1/trait_image/body_color_c/blueViolet"
      },
      "23" : {
         "icon" : "/v1/trait_image/body_color_c/springLight",
         "displayName" : "springLight"
      },
      "10" : {
         "displayName" : "oliveLight",
         "icon" : "/v1/trait_image/body_color_c/oliveLight"
      },
      "18" : {
         "icon" : "/v1/trait_image/body_color_c/pink",
         "displayName" : "pink"
      },
      "20" : {
         "icon" : "/v1/trait_image/body_color_c/purple",
         "displayName" : "purple"
      },
      "3" : {
         "icon" : "/v1/trait_image/body_color_c/buff",
         "displayName" : "buff"
      },
      "15" : {
         "icon" : "/v1/trait_image/body_color_c/vermilion",
         "displayName" : "vermilion"
      }
   }
};

  constructor(private kittiesService: KittiesService,
              private paging: Paging,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.formatTraits();
    this.loadExplore();
  }

  formatTraits(){

    this.traits = [];

    for (var key in this.api_traits) {
        if (this.api_traits.hasOwnProperty(key)) {
            let d:any = {name: key, options: []};

            for (var okey in this.api_traits[key])
            {
              let c = this.api_traits[key][okey];
              c.id = okey;
              d.options.push(c);
            }

            this.traits.push(d);
        }
    }
  }


  prettyName(name:any)
  {
     name = name.split('_').join(' ');

     return name;
  }

  selectTrait(o:any)
  {
     o.selected = !o.selected;
     this.loadExplore();
  }

  kittyImage(kitty_id:number) {
    return environment.serverUrl + "/v1/image/" + kitty_id;
  }

  traitImage(url:String) {
    return environment.serverUrl + url;
  }

  showKittyDetail(kitty:any)
  {
     this.kittiesService.setCurrentKitty(kitty);
     this.dialog.open(KittyDetailComponent, { width: '900px' });
  }

  traitHasSelections(trait:any)
  {
     for (var i = 0; i < trait.options.length; i++)
     {
        if (trait.options[i].selected)
        {
           return true;
        }
     }

     return false;
  }

  selectAll(trait:any)
  {
     for (var i = 0; i < trait.options.length; i++)
     {
        trait.options[i].selected = true;
     }
     this.loadExplore();
  }

  selectNone(trait:any)
  {
     for (var i = 0; i < trait.options.length; i++)
     {
        trait.options[i].selected = false;
     }
     this.loadExplore();
  }

  loadExplore(){
    this.isLoading = true;


    let requestOpts = {
      order: "0",
      page: this.paging.format(this.page, this.per_page, this.count)
    };

    let filters = {};

    for (var i = 0; i < this.traits.length; i++)
    {
      let trait = this.traits[i];

      for (var x = 0; x < trait.options.length; x++)
      {
         var o = trait.options[x];

         if (o && o.selected)
         {
            if (!Array.isArray(filters[trait.name]))
            {
               filters[trait.name] = [];
            }
            filters[trait.name].push(o.id);
         }
      }
    }

    this.kittiesService.getExplore(requestOpts, filters)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((res: any) => { 

        this.count = res.total_count;
        this.kitties = res.entries;
 
        this.isLoading = false;
      });
  }
}
