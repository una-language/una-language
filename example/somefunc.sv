= people
  |
    :
      id 1
      name 111
      profession :
        name 222
        experience 2
    :
      id 2
      name 333
      profession :
        name 444
        experience 4
    :
      id 3
      name 555
      profession :
        name 666
        experience 3
    :
      id 4
      name 777
      profession :
        name 888
        experience 8

= professionals
  people.map
    -> man
      :
        name man.name
        professionName man.profession.name
        workExperience man.profession.experience

= experiencedProfessionals
  professionals.filter
    -> professional
      > professional.workExperience 3

= experiencedProfessionalsNames
  experiencedProfessionals.map
    -> experiencedProfessional
      experiencedProfessional.name

console.log experiencedProfessionalsNames
