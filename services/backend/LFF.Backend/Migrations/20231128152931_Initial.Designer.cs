﻿// <auto-generated />
using System;
using LFF.Infrastructure.EF.DataAccess;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LFF.Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20231128152931_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("LFF.Core.Entities.Classroom", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CourseId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(250)
                        .HasColumnType("character varying(250)");

                    b.Property<int?>("NumberOfLessons")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.Property<DateTime?>("StartDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("TeacherId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("PK_Classroom_Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("TeacherId");

                    b.ToTable("Classrooms");
                });

            modelBuilder.Entity("LFF.Core.Entities.Course", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(128)
                        .HasColumnType("character varying(128)");

                    b.HasKey("Id")
                        .HasName("PK_Course_Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("LFF.Core.Entities.Lecture", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("LessonId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id")
                        .HasName("PK_Lecture_Id");

                    b.HasIndex("LessonId");

                    b.ToTable("Lecture");
                });

            modelBuilder.Entity("LFF.Core.Entities.Lesson", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ClassId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("EndTime")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool?>("IsApproved")
                        .HasColumnType("boolean");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("LessonContent")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ReasonForNotApproving")
                        .HasColumnType("text");

                    b.Property<DateTime?>("StartTime")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id")
                        .HasName("PK_Lesson_Id");

                    b.HasIndex("ClassId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("LFF.Core.Entities.Question", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("QuestionType")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("TestId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("PK_Question_Id");

                    b.HasIndex("TestId");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("LFF.Core.Entities.Register", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ClassId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("RegistrationDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("StudentId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("PK_Register_Id");

                    b.HasIndex("ClassId");

                    b.HasIndex("StudentId");

                    b.ToTable("Registers");
                });

            modelBuilder.Entity("LFF.Core.Entities.StudentTest", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("StartDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("StudentId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("SubmittedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("TestId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("PK_StudentTest_Id");

                    b.HasIndex("StudentId");

                    b.HasIndex("TestId");

                    b.ToTable("StudentTests");
                });

            modelBuilder.Entity("LFF.Core.Entities.StudentTestResult", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("QuestionId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<string>("Result")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("StudentTestId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("PK_StudentTestResult_Id");

                    b.HasAlternateKey("QuestionId", "StudentTestId");

                    b.HasIndex("StudentTestId");

                    b.ToTable("StudentTestResults");
                });

            modelBuilder.Entity("LFF.Core.Entities.Test", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("EndDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid?>("LessonId")
                        .IsRequired()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int?>("NumberOfAttempts")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.Property<DateTime?>("StartDate")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<int?>("Time")
                        .IsRequired()
                        .HasColumnType("integer");

                    b.HasKey("Id")
                        .HasName("PK_Test_Id");

                    b.HasIndex("LessonId");

                    b.ToTable("Tests");
                });

            modelBuilder.Entity("LFF.Core.Entities.User", b =>
                {
                    b.Property<Guid?>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("CMND")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("character varying(15)");

                    b.Property<DateTime?>("CreatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DateOfBirth")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime?>("DeletedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime?>("LastUpdatedAt")
                        .IsRequired()
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Role")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(64)
                        .HasColumnType("character varying(64)");

                    b.HasKey("Id")
                        .HasName("PK_User_Id");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("LFF.Core.Entities.Classroom", b =>
                {
                    b.HasOne("LFF.Core.Entities.Course", "Course")
                        .WithMany("Classrooms")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("LFF.Core.Entities.User", "Teacher")
                        .WithMany("Classrooms")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Course");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("LFF.Core.Entities.Lecture", b =>
                {
                    b.HasOne("LFF.Core.Entities.Lesson", "Lesson")
                        .WithMany("Lectures")
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Lesson");
                });

            modelBuilder.Entity("LFF.Core.Entities.Lesson", b =>
                {
                    b.HasOne("LFF.Core.Entities.Classroom", "Class")
                        .WithMany("Lessons")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Class");
                });

            modelBuilder.Entity("LFF.Core.Entities.Question", b =>
                {
                    b.HasOne("LFF.Core.Entities.Test", "Test")
                        .WithMany("Questions")
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Test");
                });

            modelBuilder.Entity("LFF.Core.Entities.Register", b =>
                {
                    b.HasOne("LFF.Core.Entities.Classroom", "Class")
                        .WithMany("Registers")
                        .HasForeignKey("ClassId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("LFF.Core.Entities.User", "Student")
                        .WithMany("Registers")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Class");

                    b.Navigation("Student");
                });

            modelBuilder.Entity("LFF.Core.Entities.StudentTest", b =>
                {
                    b.HasOne("LFF.Core.Entities.User", "Student")
                        .WithMany("StudentTests")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("LFF.Core.Entities.Test", "Test")
                        .WithMany("StudentTests")
                        .HasForeignKey("TestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Student");

                    b.Navigation("Test");
                });

            modelBuilder.Entity("LFF.Core.Entities.StudentTestResult", b =>
                {
                    b.HasOne("LFF.Core.Entities.Question", "Question")
                        .WithMany("StudentTestResults")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("LFF.Core.Entities.StudentTest", "StudentTest")
                        .WithMany("StudentTestResults")
                        .HasForeignKey("StudentTestId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Question");

                    b.Navigation("StudentTest");
                });

            modelBuilder.Entity("LFF.Core.Entities.Test", b =>
                {
                    b.HasOne("LFF.Core.Entities.Lesson", "Lesson")
                        .WithMany("Tests")
                        .HasForeignKey("LessonId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Lesson");
                });

            modelBuilder.Entity("LFF.Core.Entities.Classroom", b =>
                {
                    b.Navigation("Lessons");

                    b.Navigation("Registers");
                });

            modelBuilder.Entity("LFF.Core.Entities.Course", b =>
                {
                    b.Navigation("Classrooms");
                });

            modelBuilder.Entity("LFF.Core.Entities.Lesson", b =>
                {
                    b.Navigation("Lectures");

                    b.Navigation("Tests");
                });

            modelBuilder.Entity("LFF.Core.Entities.Question", b =>
                {
                    b.Navigation("StudentTestResults");
                });

            modelBuilder.Entity("LFF.Core.Entities.StudentTest", b =>
                {
                    b.Navigation("StudentTestResults");
                });

            modelBuilder.Entity("LFF.Core.Entities.Test", b =>
                {
                    b.Navigation("Questions");

                    b.Navigation("StudentTests");
                });

            modelBuilder.Entity("LFF.Core.Entities.User", b =>
                {
                    b.Navigation("Classrooms");

                    b.Navigation("Registers");

                    b.Navigation("StudentTests");
                });
#pragma warning restore 612, 618
        }
    }
}
