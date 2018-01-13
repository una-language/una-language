= people |
  :
    id 1
    name ' Alice
    profession :
      name ' Doctor
      experience 2
  :
    id 2
    name ' Bob
    profession :
      name ' Developer
      experience 4
  :
    id 3
    name ' Chris
    profession :
      name ' Teacher
      experience 3
  :
    id 4
    name ' Dolores
    profession :
      name ' Driver
      experience 8

= professionals people.map
  -> man
    : (name man.name) (professionName man.profession.name) (workExperience man.profession.experience)

= experiencedProfessionals professionals.filter
  -> professional (> professional.workExperience 3)

= experiencedProfessionalsNames experiencedProfessionals.map
  -> experiencedProfessional
    experiencedProfessional.name

console.log experiencedProfessionalsNames
