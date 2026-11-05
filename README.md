# The Base Public School

The Base Public School is an admissions-focused school site at Kusmhi Bazar, Gorakhpur. The homepage leads with an admission form and a short overview.

## Live Demo

Not deployed publicly. Start locally:

```bash
cd the-bps
python3 -m http.server 8106 --directory .
# open http://localhost:8106/
```

## Screenshots

The site shown below was running during capture. Relative paths, file names carry the project slug:

| Desktop | Mobile |
|---|---|
| `screenshots/desktop/the-bps-index-1440x900.png` | `screenshots/mobile/the-bps-index-390x844.png` |

## About the Project

The Base Public School (Kusmhi Bazar, Gorakhpur) is an educational institution for students and parents. The site walks through admissions, academics, faculty and notices.

## Key Features


 - Admission call-to-action on the homepage
 - About Us, Academics, Admissions, Faculty, Gallery, Notices pages
 - Contact form on a dedicated page
 - Campus and faculty imagery

## Technology Stack


HTML, CSS, JavaScript; Font Awesome 6 (CDN)

## Project Structure


 - index, about, academics, admissions, contact, faculty, gallery, notices + css, js, assets, data, fonts

## Installation and Setup


```bash

cd the-bps

python3 -m http.server 8106 --directory .

# open http://localhost:8106/

```


## My Contribution


The school site was put together by the owner, who still holds the source. I prepared this repository: copied the files over, checked them, and added the screenshots and setup notes. The originals were left untouched.

## Responsive Design


Homepage and inner pages were captured at 1440x900 (desktop) and 390x844 (mobile) earlier this session.

## Security and Privacy


No API keys, tokens, private keys, database credentials, or SMTP credentials were found anywhere in the repository. Public contact details that sit on the live site belong to the organisation or its people and are not something to republish beyond the repo.

## Known Limitations


- The site is a static site and is not deployed online; it is served here for review.

## Future Improvements


- Serve the site from a public host and swap in a live demo link when one becomes available.

## License


No license was found in the source, so the code is not offered for reuse. Speak to the project owner before reusing it.
