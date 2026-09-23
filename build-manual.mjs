/**
 * Builds ITEC_Complete_Guide.html from screenshots folder.
 * Run: node build-manual.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "ITEC_Complete_Guide.html");

const img = (role, file) => `screenshots/${role}/${file}`;

const dashboards = [
  {
    id: "overview",
    label: "Mindmap — Complete flow",
    title: "ITEC Academic System — Complete mindmap",
    who: "Everyone (start here)",
    flow: [
      "Super Admin sets up campus, courses, fees, and rules first",
      "Registry registers then enrolls the student (2 steps)",
      "Scholarship: Registry requests → Direção approves → discount on fee",
      "Professor enters grades when cycle is Open and permission is on",
      "Student progresses with backlogs / next level / graduate rules",
      "Student pays fees → Finance confirms / payment checkout",
      "Super Admin opens and closes semesters",
      "New year: change year, new classes, keep old history",
    ],
    tip: "This mindmap is the full school flow. Use other dashboards below to see each screen with screenshots.",
    tabs: [
      {
        id: "mm-full",
        name: "Full mindmap",
        title: "Complete flow — for everyone to understand",
        text: "Sharp interactive map of the whole ITEC system. Read top to bottom — same flow as your mindmap, without blur.",
        images: [],
        customHtml: "MINDMAP_BOARD",
      },
      {
        id: "mm-1",
        name: "1. Setup",
        title: "1. Super Admin setup",
        text: "Super Admin sets up everything first: Campus/Polo, Courses + Levels, Fees master, Scholarship types, and Grade permissions. Only Super Admin creates campuses and courses — other roles only select from the list.",
        images: [],
      },
      {
        id: "mm-2",
        name: "2. Registry",
        title: "2. Academic Registry — students",
        text: "Step 1 Register: name, DOB, phone, parent info. Step 2 Enroll: Course + Level + Class + Plan. Challan is auto-created from Fees master. Registry can also allocate subjects, change status, and request scholarship.",
        images: [],
      },
      {
        id: "mm-3",
        name: "3. Bolsa",
        title: "3. Scholarship approval",
        text: "Registry submits the request → Direção (Directorate) approves → Finance auto-applies the discount on the challan. Registry never approves.",
        images: [],
      },
      {
        id: "mm-4",
        name: "4. Grades",
        title: "4. Professor grading",
        text: "Final Average = (Best of T1/R1 + Best of T2/R2 + Exam) ÷ 3. Grades save only if the semester cycle is OPEN and the professor has permission. If either fails, the grade is blocked with an error.",
        images: [],
      },
      {
        id: "mm-5",
        name: "5. Progress",
        title: "5. Student progression & backlogs",
        text: "Pass some subjects → move on with backlogs. Pass ≥ 3 subjects → next Level/CV. Fail ALL → repeat level. Backlogs carry forward until cleared. Final year has limited attempts (default 3). Clear all backlogs + pass level → Graduated. Exceed attempts → profile expired.",
        images: [],
      },
      {
        id: "mm-6",
        name: "6. Payment",
        title: "6. Payment flow",
        text: "Student opens the fee row and pays (checkout). When payment succeeds, the fee is marked PAID. Until bank auto-link is finished, Finance can also confirm payments manually.",
        images: [],
      },
      {
        id: "mm-7",
        name: "7. Semester",
        title: "7. Semester & cycle",
        text: "1 Level = 2 Semesters (example CV1 = Year 1 = Sem1 + Sem2). Super Admin opens or closes each cycle. Closed cycle = all grades locked.",
        images: [],
      },
      {
        id: "mm-8",
        name: "8. New year",
        title: "8. New academic year",
        text: "Super Admin sets the new year. Registry creates new classes. Old data stays for history. Passed students → next level. Failed students → repeat level. New students → Level 1.",
        images: [],
      },
    ],
  },
  {
    id: "super_admin",
    label: "1. Super Admin",
    title: "Super Admin — First setup",
    who: "School system manager",
    flow: [
      "Create users and roles so staff can log in",
      "Add campuses (Polo), courses, and levels",
      "Set academic rules and open/close semesters",
      "Configure fees, late fees, and scholarship types",
      "Send mass emails when needed",
    ],
    tip: "Do Super Admin setup before anyone enrolls students.",
    tabs: [
      {
        id: "sa-painel",
        name: "Painel",
        title: "Painel principal",
        text: "Home screen after login. Shows shortcuts and a quick view of school settings. Use the left menu to open each setup screen.",
        images: ["01-painel-principal.png"],
      },
      {
        id: "sa-users",
        name: "Usuários",
        title: "Usuários",
        text: "Create staff and student logins. Choose email, name, role, and campus when needed. Without users, other people cannot enter the system.",
        images: ["02-usuarios.png"],
      },
      {
        id: "sa-roles",
        name: "Papéis",
        title: "Papéis (Roles)",
        text: "List of roles (Admin, Registry, Finance, etc.). Each role controls which menu that person sees.",
        images: ["03-papeis.png"],
      },
      {
        id: "sa-perms",
        name: "Permissões",
        title: "Permissões",
        text: "Turn modules on or off for each role (Students, Fees, Calendar, Reports…). Save after changes.",
        images: ["04-permissoes.png"],
      },
      {
        id: "sa-envio",
        name: "Novo Envio",
        title: "Novo Envio (Mass email)",
        text: "Send a message to students, parents, or professors. Filter by campus, course, or level. Email works. Choose audience carefully before sending.",
        images: ["05-novo-envio-1.png", "05-novo-envio-2.png"],
      },
      {
        id: "sa-hist",
        name: "Histórico",
        title: "Histórico de Envios",
        text: "Past mass messages. Open a row to see what was sent and to whom.",
        images: ["06-historico-envios.png"],
      },
      {
        id: "sa-fin",
        name: "Financeiras",
        title: "Configurações Financeiras",
        text: "Money rules for the whole school: payment mode (manual/automatic), late fees, monthly tuition, extra fees (emoluments), and scholarship types. Set these before enrollment so bills are correct.",
        images: ["07-config-financeiras.png"],
      },
      {
        id: "sa-polo",
        name: "Polo",
        title: "Polo (Campus)",
        text: "Add or edit campuses. Registry only selects from this list when registering students.",
        images: ["08-polo.png"],
      },
      {
        id: "sa-regras",
        name: "Regras",
        title: "Regras Académicas",
        text: "Set max absences, minimum subjects to pass a level, and open/close semester cycles. When a cycle is Closed, professors cannot change grades.",
        images: ["09-regras-1.png", "09-regras-2.png"],
      },
      {
        id: "sa-notas",
        name: "Perm. notas",
        title: "Permissões de notas",
        text: "Decide which professor can edit grades for which campus, course, and class. If permission is off, grade save is blocked.",
        images: ["10-permissoes-notas.png"],
      },
      {
        id: "sa-cursos",
        name: "Cursos",
        title: "Cursos e Níveis",
        text: "Create courses, then add levels in order (CV1 → CV2 → CV3). This order decides how students progress.",
        images: ["11-cursos.png"],
      },
      {
        id: "sa-logs",
        name: "Logs",
        title: "Logs do Sistema",
        text: "Activity history. Filter and export when you need to check who changed what.",
        images: ["12-logs.png"],
      },
      {
        id: "sa-export",
        name: "Exportar",
        title: "Exportar",
        text: "Export tools screen for downloading data when needed.",
        images: ["13-exportar.png"],
      },
      {
        id: "sa-gerais",
        name: "Gerais",
        title: "Definições Gerais",
        text: "School name, contacts, academic year, and communication options. Change the academic year here when a new year starts.",
        images: ["14-gerais.png"],
      },
      {
        id: "sa-marca",
        name: "Marca",
        title: "Marca (Brand)",
        text: "Upload logo and brand images used on login and in the system.",
        images: ["15-marca.png"],
      },
    ],
  },
  {
    id: "registration",
    label: "2. Registo Académico",
    title: "Registo Académico — Students & enrollment",
    who: "Academic Registry staff",
    flow: [
      "Register the student (personal details only)",
      "Open student profile → Enroll (course, level, class, payment plan)",
      "Fees are created automatically from Super Admin fee list",
      "Request scholarship if needed (Direção approves)",
      "Change student status when required (dropout, transfer, etc.)",
    ],
    tip: "Always enroll in two steps: Register first, then Enroll. Do not skip Super Admin setup.",
    tabs: [
      {
        id: "reg-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Overview of students and quick access to daily registry work.",
        images: ["01-dashboard.png"],
      },
      {
        id: "reg-stu",
        name: "Estudantes",
        title: "Estudantes",
        text: "Student list. Click Add to register a new student (name, contacts, parent, campus). Click a student to open the profile for enroll, status change, or documents.",
        images: ["02-estudantes.png"],
      },
      {
        id: "reg-bolsa",
        name: "Bolsa",
        title: "Bolsa (Request scholarship)",
        text: "Create a scholarship request for a student. You submit — Direção approves or rejects. You cannot approve here.",
        images: ["03-bolsa.png"],
      },
      {
        id: "reg-disc",
        name: "Disciplina",
        title: "Disciplina",
        text: "Manage subjects and link them to courses/levels so grades and class work use the right subject list.",
        images: ["04-disciplina.png"],
      },
      {
        id: "reg-curso",
        name: "Curso",
        title: "Curso",
        text: "View or manage courses used for enrollment (master courses usually come from Super Admin).",
        images: ["05-curso.png"],
      },
      {
        id: "reg-turma",
        name: "Turma",
        title: "Turma (Class)",
        text: "Create classes for the academic year: course, level, campus, shift, capacity. Students enroll into these classes.",
        images: ["06-turma.png"],
      },
      {
        id: "reg-cal",
        name: "Calendário",
        title: "Calendário",
        text: "See school calendar events. Creating events is mainly for Admin, Pedagogical, or Secretaria.",
        images: ["07-calendario.png"],
      },
      {
        id: "reg-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "In-app chat with staff and students for day-to-day communication.",
        images: ["08-mensagem.png"],
      },
      {
        id: "reg-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Registry reports and filters for student/academic data.",
        images: ["09-relatorio.png"],
      },
    ],
  },
  {
    id: "pedagogical",
    label: "3. Gestão Pedagógica",
    title: "Gestão Pedagógica — Professors & planning",
    who: "Pedagogical management",
    flow: [
      "Create professor accounts / profiles",
      "Assign professor to course + class + subject",
      "Build timetable (Horário)",
      "Manage analytical lesson plans",
      "Review evaluations submitted by students",
    ],
    tip: "Until a professor is assigned to a class, that professor will not see those students.",
    tabs: [
      {
        id: "ped-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Pedagogical home with counts and agenda.",
        images: ["01-dashboard.png"],
      },
      {
        id: "ped-stu",
        name: "Estudantes",
        title: "Estudantes",
        text: "Academic view of students. Open a student to see subjects and academic details.",
        images: ["02-estudantes.png"],
      },
      {
        id: "ped-prof",
        name: "Professores",
        title: "Professores",
        text: "Add or edit professors and assign them to courses/classes. This assignment controls what each professor can see.",
        images: ["03-professores.png"],
      },
      {
        id: "ped-hor",
        name: "Horário",
        title: "Horário",
        text: "Build the school timetable: day, time, class, subject, professor. Students and professors then see their schedule.",
        images: ["04-horario.png"],
      },
      {
        id: "ped-cal",
        name: "Calendário",
        title: "Calendário",
        text: "Create and manage school calendar events.",
        images: ["05-calendario.png"],
      },
      {
        id: "ped-plano",
        name: "Plano",
        title: "Plano analítico",
        text: "Analytical plans for teaching. Parents can also view related plans in their portal.",
        images: ["06-plano-analitico.png"],
      },
      {
        id: "ped-aval",
        name: "Avaliação",
        title: "Avaliação",
        text: "See student evaluation / feedback forms that students submitted.",
        images: ["07-avaliacao.png"],
      },
      {
        id: "ped-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "Chat with other staff and students.",
        images: ["08-mensagem.png"],
      },
      {
        id: "ped-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Pedagogical reports.",
        images: ["09-relatorio.png"],
      },
    ],
  },
  {
    id: "professor",
    label: "4. Professor",
    title: "Professor — Teach your classes",
    who: "Teachers",
    flow: [
      "Open Estudantes — only your assigned classes appear",
      "Enter grades when the semester cycle is Open",
      "Add lesson plans for your subjects",
      "Check your timetable and calendar",
      "Chat with your classes",
    ],
    tip: "If grades will not save: ask Super Admin to open the semester and check your grade permission.",
    tabs: [
      {
        id: "prof-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Your teaching home. Useful after you are assigned to classes.",
        images: ["01-dashboard.png"],
      },
      {
        id: "prof-stu",
        name: "Estudantes",
        title: "Estudantes & grades",
        text: "Only students in your assigned classes. Open a student to enter Test 1, Retake 1, Test 2, Retake 2, and Exam. The system calculates the final average. Pass mark is 10/20.",
        images: ["02-estudantes.png"],
      },
      {
        id: "prof-fin",
        name: "Financeiro",
        title: "Financeiro (your salary)",
        text: "Your own salary / financial view — not student fees.",
        images: ["03-financeiro.png"],
      },
      {
        id: "prof-hor",
        name: "Horário",
        title: "Horário",
        text: "Your teaching timetable built by Pedagogical management.",
        images: ["04-horario.png"],
      },
      {
        id: "prof-aval",
        name: "Avaliação",
        title: "Avaliação",
        text: "View evaluations related to your teaching.",
        images: ["05-avaliacao.png"],
      },
      {
        id: "prof-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School events (view).",
        images: ["06-calendario.png"],
      },
      {
        id: "prof-plano",
        name: "Plano",
        title: "Plano de Aulas",
        text: "Create and edit lesson plans for your assigned subjects/classes.",
        images: ["07-plano-de-aulas.png"],
      },
      {
        id: "prof-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "Chat grouped by your classes (Minhas Turmas).",
        images: ["08-mensagem.png"],
      },
    ],
  },
  {
    id: "secretary",
    label: "5. Secretaria",
    title: "Secretaria — Attendance & calendar",
    who: "Secretariat staff",
    flow: [
      "Open Estudantes to mark attendance",
      "Review attendance history when needed",
      "Create or edit calendar events",
      "View professors, schedule, and messages",
    ],
    tip: "Too many absences can fail a student by rule — keep attendance up to date.",
    tabs: [
      {
        id: "sec-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Secretariat home with agenda and quick stats.",
        images: ["01-dashboard.png"],
      },
      {
        id: "sec-stu",
        name: "Estudantes",
        title: "Estudantes & attendance",
        text: "Mark present/absent and check attendance history for students.",
        images: ["02-estudantes.png"],
      },
      {
        id: "sec-prof",
        name: "Professores",
        title: "Professores",
        text: "Teacher list and profiles (view).",
        images: ["03-professores.png"],
      },
      {
        id: "sec-hor",
        name: "Horário",
        title: "Horário",
        text: "View school timetable.",
        images: ["04-horario.png"],
      },
      {
        id: "sec-cal",
        name: "Calendário",
        title: "Calendário",
        text: "Create and manage school calendar events.",
        images: ["05-calendario.png"],
      },
      {
        id: "sec-aval",
        name: "Avaliação",
        title: "Avaliação",
        text: "View evaluation module.",
        images: ["06-avaliacao.png"],
      },
      {
        id: "sec-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "In-app chat.",
        images: ["07-mensagem.png"],
      },
      {
        id: "sec-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Secretariat reports.",
        images: ["08-relatorio.png"],
      },
    ],
  },
  {
    id: "admin",
    label: "6. Direção (Admin)",
    title: "Direção — Overview & scholarship approval",
    who: "School direction / admin",
    flow: [
      "Review school overview on Dashboard",
      "Approve or reject scholarship requests (Bolsa)",
      "Mark student attendance when permission is allowed",
      "Check finance overview and reports",
      "Support calendar, schedule, and evaluations",
    ],
    tip: "Only Direção approves Bolsa. Registry only requests. Attendance appears only if that permission is allowed.",
    tabs: [
      {
        id: "adm-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "School overview: charts, attendance summary, and agenda.",
        images: ["01-dashboard.png"],
      },
      {
        id: "adm-stu",
        name: "Estudantes",
        title: "Estudantes",
        text: "Full student list and details for direction oversight. Admin can also mark attendance here when permission is allowed.",
        images: ["02-estudantes.png"],
      },
      {
        id: "adm-bolsa",
        name: "Bolsa",
        title: "Bolsa (Approve)",
        text: "Pending scholarship requests. Approve, reject, or cancel. Approved discounts appear on student fees.",
        images: ["03-bolsa.png"],
      },
      {
        id: "adm-prof",
        name: "Professores",
        title: "Professores",
        text: "Teacher list and management access.",
        images: ["04-professores.png"],
      },
      {
        id: "adm-fin",
        name: "Financeiro",
        title: "Financeiro",
        text: "Financial overview and delinquency views for direction.",
        images: ["05-financeiro.png"],
      },
      {
        id: "adm-hor",
        name: "Horário",
        title: "Horário",
        text: "School timetable view.",
        images: ["06-horario.png"],
      },
      {
        id: "adm-plano",
        name: "Plano",
        title: "Plano de Aula",
        text: "Lesson plans overview.",
        images: ["07-plano-de-aula.png"],
      },
      {
        id: "adm-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School calendar events.",
        images: ["08-calendario.png"],
      },
      {
        id: "adm-aval",
        name: "Avaliação",
        title: "Avaliação",
        text: "Student evaluation forms and charts.",
        images: ["09-avaliacao.png"],
      },
      {
        id: "adm-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "In-app messages.",
        images: ["10-mensagem.png"],
      },
      {
        id: "adm-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Direction reports. Some report types may still be expanding.",
        images: ["11-relatorio.png"],
      },
    ],
  },
  {
    id: "finance",
    label: "7. Finanças",
    title: "Finanças — Fees & payments",
    who: "Finance staff",
    flow: [
      "Open Estudantes to see fee bills",
      "Generate challan / PDF when needed",
      "In manual mode, mark paid / pending / overdue",
      "Apply authorised discounts when allowed",
      "Follow late fees shown on the bill",
    ],
    tip: "Bank auto-deposit is still pending. Use manual confirmation for daily payments until bank connection is finished.",
    tabs: [
      {
        id: "fin-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Finance home: revenue view, agenda, and quick links.",
        images: ["01-dashboard.png"],
      },
      {
        id: "fin-stu",
        name: "Estudantes",
        title: "Estudantes (main money screen)",
        text: "Create fee bills, download challan PDF, update payment status, and open student fee detail (discounts, late fee, total).",
        images: ["02-estudantes.png"],
      },
      {
        id: "fin-prof",
        name: "Professores",
        title: "Professores",
        text: "Teacher list related to finance views.",
        images: ["03-professores.png"],
      },
      {
        id: "fin-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School calendar.",
        images: ["04-calendario.png"],
      },
      {
        id: "fin-hor",
        name: "Horário",
        title: "Horário",
        text: "Timetable view.",
        images: ["05-horario.png"],
      },
      {
        id: "fin-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "In-app chat.",
        images: ["06-mensagem.png"],
      },
      {
        id: "fin-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Fee account reports (open, paid, all accounts).",
        images: ["07-relatorio.png"],
      },
    ],
  },
  {
    id: "charge",
    label: "8. Cobrança",
    title: "Cobrança — Collections",
    who: "Collections / in-charge staff",
    flow: [
      "Check Dashboard for overdue and collections overview",
      "Use Financeiro / Estudantes to follow unpaid fees",
      "Coordinate with Finance for challan and status updates",
    ],
    tip: "Same fee world as Finance — focused on collecting what is due.",
    tabs: [
      {
        id: "ch-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Collections overview and monthly fee charts.",
        images: ["01-dashboard.png"],
      },
      {
        id: "ch-fin",
        name: "Financeiro",
        title: "Financeiro",
        text: "Collections list of student fees and overdue amounts.",
        images: ["02-financeiro.png"],
      },
      {
        id: "ch-stu",
        name: "Estudantes",
        title: "Estudantes",
        text: "Student fee follow-up from the collections side.",
        images: ["03-estudantes.png"],
      },
      {
        id: "ch-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School calendar.",
        images: ["04-calendario.png"],
      },
      {
        id: "ch-hor",
        name: "Horário",
        title: "Horário",
        text: "Timetable view.",
        images: ["05-horario.png"],
      },
      {
        id: "ch-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "In-app chat.",
        images: ["06-mensagem.png"],
      },
      {
        id: "ch-rel",
        name: "Relatório",
        title: "Relatório",
        text: "Collections reports.",
        images: ["07-relatorio.png"],
      },
    ],
  },
  {
    id: "students",
    label: "9. Estudante",
    title: "Estudante — My portal",
    who: "Students",
    flow: [
      "Check Financeiro for fees and upload payment proof if needed",
      "Open Situação Acadêmica for grades and progress",
      "See Horário, Calendário, and lesson plans",
      "Submit Avaliação (feedback) when asked",
    ],
    tip: "If a monthly fee is overdue after grace, menu may be limited to Financeiro until regularized.",
    tabs: [
      {
        id: "stu-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Your student home with quick links.",
        images: ["01-dashboard.png"],
      },
      {
        id: "stu-fin",
        name: "Financeiro",
        title: "Financeiro",
        text: "Your fees, discounts, late fees, and totals. Upload payment proof when Finance asks for it.",
        images: ["02-financeiro.png"],
      },
      {
        id: "stu-acad",
        name: "Situação",
        title: "Situação Acadêmica",
        text: "Your subjects, averages, pass/fail status, and level progress.",
        images: ["03-situacao-academica.png"],
      },
      {
        id: "stu-hor",
        name: "Horário",
        title: "Horário",
        text: "Your class timetable.",
        images: ["04-horario.png"],
      },
      {
        id: "stu-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School events.",
        images: ["05-calendario.png"],
      },
      {
        id: "stu-aval",
        name: "Avaliação",
        title: "Avaliação",
        text: "Submit your evaluation / feedback form.",
        images: ["06-avaliacao.png"],
      },
      {
        id: "stu-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "Chat with school staff.",
        images: ["07-mensagem.png"],
      },
      {
        id: "stu-plano",
        name: "Plano",
        title: "Plano de Aulas",
        text: "Lesson plans for your classes.",
        images: ["08-plano-de-aulas.png"],
      },
    ],
  },
  {
    id: "pais",
    label: "10. Pais",
    title: "Pais — Parent / guardian portal",
    who: "Parents / guardians",
    flow: [
      "Check your child’s fees in Financeiro",
      "Open Situação Acadêmica for grades and progress",
      "See schedule, calendar, and analytical plans",
      "Message the school when needed",
    ],
    tip: "You see your linked child’s information — not other students.",
    tabs: [
      {
        id: "pais-dash",
        name: "Dashboard",
        title: "Dashboard",
        text: "Parent home for your child.",
        images: ["01-dashboard.png"],
      },
      {
        id: "pais-fin",
        name: "Financeiro",
        title: "Financeiro",
        text: "Your child’s fees and payment status.",
        images: ["03-financeiro.png"],
      },
      {
        id: "pais-acad",
        name: "Situação",
        title: "Situação Acadêmica",
        text: "Your child’s academic situation, subjects, and results.",
        images: ["03-situacao-academica.png"],
      },
      {
        id: "pais-hor",
        name: "Horário",
        title: "Horário",
        text: "Your child’s timetable.",
        images: ["04-horario.png"],
      },
      {
        id: "pais-cal",
        name: "Calendário",
        title: "Calendário",
        text: "School events.",
        images: ["05-calendario.png"],
      },
      {
        id: "pais-msg",
        name: "Mensagem",
        title: "Mensagem",
        text: "Message school staff.",
        images: ["06-mensagem.png"],
      },
      {
        id: "pais-plano",
        name: "Plano",
        title: "Plano de Aulas / Analítico",
        text: "Lesson / analytical plans linked to your child.",
        images: ["07-plano-de-aulas.png"],
      },
    ],
  },
];

const MINDMAP_BOARD = `
<div class="mindmap-board" aria-label="ITEC complete flow mindmap">
  <div class="mm-title">ITEC Academic System</div>
  <p class="mm-sub">Complete flow — for everyone to understand</p>

  <div class="mm-arrow">▼</div>
  <div class="mm-step purple">1. Super Admin sets up everything first</div>
  <div class="mm-row">
    <span class="mm-chip purple">Campus / Polo</span>
    <span class="mm-chip purple">Courses + Levels</span>
    <span class="mm-chip purple">Fees master</span>
    <span class="mm-chip purple">Scholarship types</span>
    <span class="mm-chip purple">Grade permissions</span>
  </div>
  <div class="mm-note dashed">Only Super Admin can create campuses and courses. Others only select.</div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step green">2. Academic Registry — manages students</div>
  <div class="mm-row">
    <span class="mm-chip green">Step 1 — Register<br><small>Name, DOB, phone, parent info</small></span>
    <span class="mm-then">then</span>
    <span class="mm-chip green">Step 2 — Enroll<br><small>Course + Level + Class + Plan</small></span>
  </div>
  <div class="mm-note">Challan auto-generated from Fees master on enrollment</div>
  <div class="mm-row">
    <span class="mm-chip green">Allocate subjects</span>
    <span class="mm-chip green">Change student status</span>
    <span class="mm-chip green">Request scholarship</span>
  </div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step orange">3. Scholarship approval flow</div>
  <div class="mm-row">
    <span class="mm-chip orange">Registry submits request</span>
    <span class="mm-then">→</span>
    <span class="mm-chip orange">Directorate approves</span>
  </div>
  <div class="mm-note">Finance auto-applies discount to challan</div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step blue">4. Professor enters grades</div>
  <div class="mm-formula">Formula: (Best T1/R1 + Best T2/R2 + Exam) ÷ 3 = Final Average</div>
  <div class="mm-row">
    <span class="mm-chip blue">Cycle must be OPEN</span>
    <span class="mm-then">AND</span>
    <span class="mm-chip blue">Professor needs permission</span>
  </div>
  <div class="mm-note danger">Either fails → grade blocked, error shown</div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step teal">5. Student progression (backlog model)</div>
  <div class="mm-row">
    <span class="mm-chip teal">Pass some subjects<br><small>Failed = Backlog, still move on</small></span>
    <span class="mm-chip teal">Pass ≥ 3 subjects total<br><small>Approved → next Level / CV</small></span>
    <span class="mm-chip danger">Fail ALL subjects<br><small>Repeat level from scratch</small></span>
  </div>
  <div class="mm-note">Backlogs carry forward with new subjects. Cleared when student passes that subject again.</div>
  <div class="mm-note orange-bg">Final year: Super Admin sets attempts (default 3). After limit → PROFILE EXPIRED. Clear all backlogs + pass level → GRADUATED</div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step pink">6. Payment flow</div>
  <div class="mm-row">
    <span class="mm-chip pink">Student clicks Pay</span>
    <span class="mm-then">→</span>
    <span class="mm-chip pink">Checkout / card pay</span>
    <span class="mm-then">→</span>
    <span class="mm-chip pink">Status = PAID</span>
  </div>
  <div class="mm-note">Bank auto-link still pending — Finance can also confirm payments manually.</div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step blue">7. Semester &amp; academic cycle</div>
  <div class="mm-row">
    <span class="mm-chip blue">1 Level = 2 Semesters<br><small>CV1 = Year 1 = Sem1 + Sem2</small></span>
    <span class="mm-chip blue">Admin opens / closes cycles<br><small>Closed = all grades locked</small></span>
  </div>

  <div class="mm-arrow">▼</div>
  <div class="mm-step purple">8. New academic year switch</div>
  <div class="mm-row">
    <span class="mm-chip purple">Super Admin sets new year</span>
    <span class="mm-chip purple">Registry creates new classes</span>
    <span class="mm-chip purple">Old data kept for history</span>
  </div>
  <div class="mm-note success">Passed → next level &nbsp;|&nbsp; Failed → repeat level &nbsp;|&nbsp; New students → Level 1</div>
</div>
`;

function renderTabPanel(roleId, tab, isFirst) {
  const imagesHtml = (tab.images || [])
    .map(
      (f) => `
            <figure class="shot">
              <img src="${img(roleId, f)}" alt="${tab.title}" loading="lazy" />
              <figcaption>${tab.title}</figcaption>
            </figure>`,
    )
    .join("");

  const custom =
    tab.customHtml === "MINDMAP_BOARD" ? MINDMAP_BOARD : tab.customHtml || "";

  return `
        <div class="tab-panel${isFirst ? " active" : ""}" data-panel="${tab.id}" role="tabpanel">
          <h3>${tab.title}</h3>
          <p>${tab.text}</p>
          ${custom}
          ${imagesHtml ? `<div class="shots">${imagesHtml}</div>` : ""}
        </div>`;
}

function renderDashboard(d) {
  const tabsNav = d.tabs
    .map(
      (t, i) =>
        `<button type="button" class="tab-btn${i === 0 ? " active" : ""}" data-tab="${t.id}" role="tab">${t.name}</button>`,
    )
    .join("");

  const panels = d.tabs.map((t, i) => renderTabPanel(d.id, t, i === 0)).join("");

  const flowItems = d.flow.map((s) => `<li>${s}</li>`).join("");

  return `
    <section class="dash-section" id="dash-${d.id}" data-dash="${d.id}" hidden>
      <div class="dash-head">
        <h2>${d.title}</h2>
        <p class="who">For: <strong>${d.who}</strong></p>
      </div>
      <div class="flow-card">
        <h3>Simple flow</h3>
        <ol>${flowItems}</ol>
        <p class="tip"><strong>Tip:</strong> ${d.tip}</p>
      </div>
      <div class="tabs-nav" role="tablist">${tabsNav}</div>
      <div class="tabs-body">${panels}</div>
    </section>`;
}

const options = dashboards
  .map((d) => `<option value="${d.id}">${d.label}</option>`)
  .join("");

const sections = dashboards.map(renderDashboard).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>ITEC User Manual — All Dashboards</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
:root {
  --primary: #58398d;
  --primary-600: #4c327a;
  --primary-700: #3e2865;
  --primary-50: #f3f0f9;
  --primary-100: #e8e0f3;
  --secondary: #ea5b28;
  --secondary-50: #fff4f0;
  --green: #4bd670;
  --green-bg: #effff1;
  --text: #212121;
  --muted: #555;
  --border: #d1d5db;
  --radius: 0.75rem;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(180deg, #f3f0f9 0%, #fff8f5 45%, #f7f7f9 100%);
  color: var(--text);
  line-height: 1.65;
}
.header {
  background: linear-gradient(135deg, #58398d 0%, #3e2865 55%, #ea5b28 140%);
  color: #fff;
  padding: 40px 24px 32px;
}
.header-inner, .wrap, .sticky-bar-inner { max-width: 1120px; margin: 0 auto; }
.eyebrow {
  display: inline-block;
  background: rgba(255,255,255,.18);
  border: 1px solid rgba(255,255,255,.28);
  border-radius: 999px;
  padding: 4px 14px;
  font-size: .8rem;
  font-weight: 600;
  margin-bottom: 12px;
}
.header h1 {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  font-weight: 700;
}
.header p { margin-top: 8px; opacity: .92; max-width: 720px; }
.sticky-bar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: #fff;
  border-bottom: 3px solid var(--primary);
  box-shadow: 0 2px 10px rgba(88,57,141,.08);
  padding: 12px 24px;
}
.sticky-bar-inner {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}
.sticky-bar label {
  font-size: .85rem;
  font-weight: 600;
  color: var(--primary);
}
.dash-select {
  min-width: 260px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--primary-100);
  font: inherit;
  color: var(--text);
  background: var(--primary-50);
}
.wrap { padding: 24px 20px 56px; }
.card {
  background: #fff;
  border: 1px solid var(--primary-100);
  border-radius: var(--radius);
  padding: 22px 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px rgba(88,57,141,.06);
}
.card h2 {
  font-family: 'Poppins', sans-serif;
  color: var(--primary);
  font-size: 1.2rem;
  margin-bottom: 10px;
}
.card ol, .card ul { padding-left: 20px; color: var(--muted); }
.card li { margin-bottom: 6px; }
.school-flow {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}
.school-flow .step {
  background: var(--primary-50);
  border-left: 4px solid var(--primary);
  border-radius: 8px;
  padding: 10px 14px;
  font-size: .92rem;
  color: var(--primary-700);
}
.school-flow .step strong { color: var(--secondary); }
.dash-section {
  background: #fff;
  border: 1px solid #eee;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: 0 2px 14px rgba(88,57,141,.07);
  margin-bottom: 24px;
}
.dash-head {
  background: var(--primary);
  color: #fff;
  padding: 18px 22px;
}
.dash-head h2 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
}
.dash-head .who { opacity: .9; font-size: .9rem; margin-top: 4px; }
.flow-card {
  padding: 18px 22px;
  border-bottom: 1px solid #eee;
  background: linear-gradient(180deg, #fff, var(--primary-50));
}
.flow-card h3 {
  color: var(--primary);
  font-size: 1rem;
  margin-bottom: 8px;
  font-family: 'Poppins', sans-serif;
}
.flow-card ol { padding-left: 20px; color: #444; }
.flow-card li { margin-bottom: 6px; }
.flow-card .tip {
  margin-top: 12px;
  background: var(--secondary-50);
  border-left: 4px solid var(--secondary);
  border-radius: 8px;
  padding: 10px 12px;
  color: #7a2f14;
  font-size: .9rem;
}
.tabs-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 14px;
  background: #fafafa;
  border-bottom: 1px solid #eee;
}
.tab-btn {
  border: 1px solid var(--primary-100);
  background: #fff;
  color: var(--primary);
  border-radius: 999px;
  padding: 7px 12px;
  font-size: .8rem;
  font-weight: 600;
  cursor: pointer;
  font-family: inherit;
}
.tab-btn:hover { border-color: var(--secondary); color: var(--secondary); }
.tab-btn.active {
  background: var(--primary);
  border-color: var(--primary);
  color: #fff;
}
.tabs-body { padding: 18px 22px 24px; }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
.tab-panel h3 {
  font-family: 'Poppins', sans-serif;
  color: var(--primary);
  font-size: 1.05rem;
  margin-bottom: 8px;
}
.tab-panel > p { color: #444; margin-bottom: 16px; max-width: 820px; }
.shots { display: grid; gap: 16px; }
.shot {
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  overflow: hidden;
  background: #fff;
}
.shot img {
  width: 100%;
  display: block;
  background: #f3f0f9;
}
.shot figcaption {
  padding: 10px 14px;
  background: var(--primary-50);
  font-size: .84rem;
  color: #555;
  border-top: 1px solid var(--primary-100);
}

/* Sharp HTML mindmap (replaces low-res stretched PNG) */
.mindmap-board {
  background: #111;
  color: #f5f5f5;
  border-radius: 14px;
  padding: 22px 18px 28px;
  margin-top: 8px;
  border: 1px solid #2a2a2a;
}
.mm-title {
  display: inline-block;
  background: #6b4ea8;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 1.15rem;
  padding: 10px 18px;
  border-radius: 10px;
}
.mm-sub {
  margin: 10px 0 6px;
  color: #cfcfcf;
  font-size: .95rem;
}
.mm-arrow {
  text-align: center;
  color: #aaa;
  margin: 8px 0;
  font-size: 1rem;
}
.mm-step {
  display: inline-block;
  font-weight: 700;
  font-size: .95rem;
  padding: 10px 14px;
  border-radius: 10px;
  margin-bottom: 10px;
}
.mm-step.purple { background: #5b3d8f; }
.mm-step.green { background: #2f6b45; }
.mm-step.orange { background: #9a4a1e; }
.mm-step.blue { background: #1f4f86; }
.mm-step.teal { background: #1f6b5c; }
.mm-step.pink { background: #8a3a5c; }
.mm-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
  margin: 8px 0 10px;
}
.mm-chip {
  background: #1c1c1c;
  border: 1px solid #3a3a3a;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: .86rem;
  line-height: 1.35;
  max-width: 100%;
}
.mm-chip small { display: block; color: #bbb; font-size: .78rem; margin-top: 3px; font-weight: 400; }
.mm-chip.purple { border-color: #7a5bb8; background: #241836; }
.mm-chip.green { border-color: #4bd670; background: #14261a; }
.mm-chip.orange { border-color: #ea5b28; background: #2a1610; }
.mm-chip.blue { border-color: #5b9bd5; background: #122033; }
.mm-chip.teal { border-color: #3dd6b5; background: #10241f; }
.mm-chip.pink { border-color: #e8916a; background: #2a1520; }
.mm-chip.danger { border-color: #ef4444; background: #2a1212; color: #fecaca; }
.mm-then {
  color: #aaa;
  font-size: .8rem;
  font-weight: 600;
  padding: 0 4px;
}
.mm-formula {
  background: #1a2740;
  border: 1px solid #3a6ea5;
  border-radius: 10px;
  padding: 12px 14px;
  margin: 8px 0 10px;
  font-weight: 700;
  color: #dbeafe;
  font-size: .92rem;
}
.mm-note {
  background: #1a1a1a;
  border-left: 3px solid #666;
  border-radius: 8px;
  padding: 10px 12px;
  margin: 8px 0 12px;
  font-size: .86rem;
  color: #ddd;
}
.mm-note.dashed {
  border: 1px dashed #7a5bb8;
  border-left: 1px dashed #7a5bb8;
  background: #1a1424;
  color: #e4d8ff;
}
.mm-note.danger {
  border-left-color: #ef4444;
  background: #2a1212;
  color: #fecaca;
}
.mm-note.orange-bg {
  border-left-color: #ea5b28;
  background: #2a1610;
  color: #ffd4c4;
}
.mm-note.success {
  border-left-color: #4bd670;
  background: #14261a;
  color: #bbf7d0;
  font-weight: 600;
}
@media (max-width: 720px) {
  .mm-chip { width: 100%; }
}
.help-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.help-item {
  border: 1px solid var(--primary-100);
  border-radius: 10px;
  padding: 12px;
  font-size: .88rem;
  color: var(--muted);
}
.help-item strong { display: block; color: var(--primary); margin-bottom: 4px; }
.footer {
  background: linear-gradient(90deg, var(--primary), var(--primary-700));
  color: #fff;
  text-align: center;
  padding: 20px 16px;
}
.footer .sub { opacity: .7; font-size: .85rem; margin-top: 6px; }
@media (max-width: 720px) {
  .header h1 { font-size: 1.5rem; }
  .dash-select { min-width: 100%; width: 100%; }
}
</style>
</head>
<body>

<header class="header">
  <div class="header-inner">
    <div class="eyebrow">ITEC · Client User Manual</div>
    <h1>ITEC Academic System</h1>
    <p>Simple guide for every dashboard. Choose a dashboard below, then open each tab to see the screen and what to do — in plain language.</p>
  </div>
</header>

<div class="sticky-bar">
  <div class="sticky-bar-inner">
    <div>
      <label for="dashSelect">Choose dashboard</label><br />
      <select id="dashSelect" class="dash-select">${options}</select>
    </div>
    <div style="font-size:.82rem;color:#666;max-width:420px;">
      Start with <strong>Mindmap</strong>, then: Super Admin → Pedagogical → Registry → Finance → Professor → Student/Parent
    </div>
  </div>
</div>

<main class="wrap">

  <section class="card" id="overview">
    <h2>How the school uses ITEC (full flow)</h2>
    <p style="color:var(--muted);margin-bottom:8px;">One student record moves through the whole school. Do not skip steps.</p>
    <div class="school-flow">
      <div class="step"><strong>1.</strong> Super Admin sets up campus, courses, fees, and rules</div>
      <div class="step"><strong>2.</strong> Pedagogical creates professors and assigns classes + timetable</div>
      <div class="step"><strong>3.</strong> Registry registers the student, then enrolls in course/class</div>
      <div class="step"><strong>4.</strong> System creates fees → Finance confirms payments</div>
      <div class="step"><strong>5.</strong> Professor enters grades (semester must be Open)</div>
      <div class="step"><strong>6.</strong> Student &amp; Parent see grades and fees</div>
      <div class="step"><strong>7.</strong> Direção approves scholarship (Bolsa) when requested</div>
    </div>
  </section>

  <section class="card">
    <h2>Quick help</h2>
    <div class="help-grid">
      <div class="help-item"><strong>Missing menu?</strong> Your role or permissions do not include that module.</div>
      <div class="help-item"><strong>Grades blocked?</strong> Open the semester in Super Admin Regras, and check professor grade permission.</div>
      <div class="help-item"><strong>Wrong fees?</strong> Check Super Admin fee list and Mandatory toggle before enrollment.</div>
      <div class="help-item"><strong>Bank payment?</strong> Bank auto-link is pending — Finance confirms payments manually for now.</div>
    </div>
  </section>

  ${sections}

</main>

<footer class="footer">
  <p>ITEC Academic System — Dashboard User Manual</p>
  <p class="sub">Screenshots from live app · Simple flows · ITEC colors · September 2026</p>
</footer>

<script>
(function () {
  var select = document.getElementById('dashSelect');
  var sections = document.querySelectorAll('.dash-section');

  function showDash(id) {
    sections.forEach(function (sec) {
      sec.hidden = sec.getAttribute('data-dash') !== id;
    });
  }

  select.addEventListener('change', function () {
    showDash(select.value);
    window.scrollTo({ top: document.getElementById('overview').offsetTop + 40, behavior: 'smooth' });
  });

  document.querySelectorAll('.dash-section').forEach(function (sec) {
    var buttons = sec.querySelectorAll('.tab-btn');
    var panels = sec.querySelectorAll('.tab-panel');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-tab');
        buttons.forEach(function (b) { b.classList.toggle('active', b === btn); });
        panels.forEach(function (p) {
          p.classList.toggle('active', p.getAttribute('data-panel') === id);
        });
      });
    });
  });

  showDash(select.value);
})();
</script>

</body>
</html>
`;

fs.writeFileSync(OUT, html, "utf8");
console.log("Wrote", OUT, "bytes", html.length);
