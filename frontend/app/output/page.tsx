import QuestionPaper from '@/components/QuestionPaper'

const page = () => {
  return (
    <QuestionPaper
  schoolName="Delhi Public School, Sector-4, Bokaro"
  subject="Science"
  className="8th"
  timeAllowed="45 minutes"
  maximumMarks={20}
  sections={[
    {
      label: "A",

      title: "Short Answer Questions",

      instruction:
        "Attempt all questions. Each question carries 2 marks",

      questions: [
        {
          text: "Define electroplating. Explain its purpose.",

          difficulty: "easy",

          marks: 2,

          answer:
            "Electroplating is the process of depositing a thin layer of metal on another metal using electric current. It is used to prevent corrosion and improve appearance.",
        },

        {
          text: "What is the role of a conductor in electrolysis?",

          difficulty: "medium",

          marks: 2,

          answer:
            "A conductor allows electric current to flow through the electrolyte and helps chemical reactions occur at electrodes.",
        },

        {
          text: "Why does copper sulphate solution conduct electricity?",

          difficulty: "easy",

          marks: 2,

          answer:
            "Copper sulphate solution contains free ions which carry electric charge.",
        },

        {
          text: "Describe one example of chemical effect of electric current in daily life.",

          difficulty: "medium",

          marks: 2,

          answer:
            "Electroplating of silver on jewellery is a common example of chemical effects of electric current.",
        },

        {
          text: "Explain why electric current is said to have chemical effects.",

          difficulty: "medium",

          marks: 2,

          answer:
            "Electric current causes chemical reactions like formation of gases and deposition of metals in electrolytes.",
        },

        {
          text: "How is sodium hydroxide prepared during electrolysis of brine?",

          difficulty: "hard",

          marks: 2,

          answer:
            "During electrolysis of brine, chlorine gas forms at the anode and hydrogen gas at the cathode while sodium hydroxide remains in solution.",
        },

        {
          text: "What happens at the cathode and anode during electrolysis of water?",

          difficulty: "hard",

          marks: 2,

          answer:
            "Hydrogen gas is produced at the cathode and oxygen gas is produced at the anode.",
        },

        {
          text: "Mention one use of current in electroplating.",

          difficulty: "easy",

          marks: 2,

          answer:
            "Electric current is used in electroplating to coat metals like chromium on objects.",
        },

        {
          text: "What is the importance of electric current in metal purification?",

          difficulty: "hard",

          marks: 2,

          answer:
            "Electric current helps remove impurities from metals during electrolytic refining.",
        },

        {
          text: "Explain copper deposition in electroplating with a chemical reaction.",

          difficulty: "hard",

          marks: 2,

          answer:
            "Copper ions gain electrons and deposit as copper metal on the object during electroplating.",
        },
      ],
    },
  ]}
/>
  )
}

export default page