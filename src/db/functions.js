import { QueryTypes } from 'sequelize';
import { sequelize } from './config.js';
import picocolors from 'picocolors';

const fnUserGetInfo = `
  CREATE OR REPLACE FUNCTION public.fn_user_getinfo(
    id uuid,
    dbuser refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbuser FOR SELECT users."id",
      users."username",
      roles."role",
      users."name",
      users."email",
      users."occupation",
      areas."name" as area
    FROM users
      JOIN roles ON users."idRole" = roles."id"
      JOIN areas ON users."idArea" = areas."id"
    WHERE users."id" = $1;
    RETURN dbuser;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_user_getinfo(uuid, refcursor)
      OWNER TO postgres;
  `;

const fnOrgGetWorkers = `
  CREATE OR REPLACE FUNCTION public.fn_organization_getworkers(
    id integer,
    dbworkers refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbworkers FOR SELECT users."id",
      users."name"
    FROM organizations
      JOIN "organizationsMembers" ON organizations."id" = "organizationsMembers"."idOrganization"
      JOIN users ON "organizationsMembers"."idMember" = users."id"
    WHERE organizations."id" = $1;
    RETURN dbworkers;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_organization_getworkers(integer, refcursor)
      OWNER TO postgres;
  `;

const fnToMGetInfo = `
  CREATE OR REPLACE FUNCTION public.fn_tom_getinfo(
    id integer,
    dbtom refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbtom FOR SELECT "typesOfMeetings"."id",
      "typesOfMeetings"."name",
      organizations."name" as organization
    FROM "typesOfMeetings"
      JOIN organizations ON "typesOfMeetings"."idOrganization" = organization."id"
    WHERE "typesOfMeetings"."id" = $1;
    RETURN dbtom;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_tom_getinfo(integer, refcursor)
      OWNER TO postgres;
  `;

const fnOrgGetToMs = `
  CREATE OR REPLACE FUNCTION public.fn_organization_gettoms(
    id integer,
    dbtoms refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbtoms FOR SELECT "typesOfMeetings"."id",
      "typesOfMeetings"."name",
      "typesOfMeetings"."idOrganization",
      "typesOfMeetings"."state"
    FROM organizations
      JOIN "typesOfMeetings" ON organizations."id" = "typesOfMeetings"."idOrganization"
    WHERE organizations."id" = $1 AND "typesOfMeetings"."state" = 'true';
    RETURN dbtoms;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_organization_gettoms(integer, refcursor)
      OWNER TO postgres;
  `;

const fnOrgGetInfo = `
  CREATE OR REPLACE FUNCTION public.fn_organization_getinfo(
    id integer,
    dborg refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dborg FOR SELECT organizations."id",
      organizations."name",
      users."name" AS leader
    FROM organizations
      JOIN users ON organizations."idLeader" = users."id"
    WHERE organizations."id" = $1;
    RETURN dborg;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_organization_getinfo(integer, refcursor)
      OWNER TO postgres;
  `;

const fnMeetingGetInfo = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_getinfo(
    id integer,
    dbmeeting refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbmeeting FOR SELECT meetings."id",
      meetings."name",
      meetings."session",
      meetings."date",
      meetings."startTime",
      meetings."endTime",
      users."name" AS secretary,
      "typesOfMeetings"."name" AS "typeOfMeeting"
    FROM meetings
      JOIN users ON meetings."idSecretary" = users."id"
      JOIN "typesOfMeetings" ON meetings."idTypeOfMeeting" = "typesOfMeetings"."id"
    WHERE meetings."id" = $1;
    RETURN dbmeeting;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_getinfo(integer, refcursor)
      OWNER TO postgres;
  `;

const fnMeetingAddWorker = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_addworker(
    "idMeeting" integer,
    "idWorker" uuid)
      RETURNS VOID
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    INSERT INTO "meetingsGuests" ("idMeeting", "idGuest") VALUES ($1,$2);
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_addworker(integer, uuid)
      OWNER TO postgres;
  `;

const fnMeetingGetAllWorkers = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_getallworkers(
    "idMeeting" integer,
    "dbworkers" refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbworkers FOR SELECT "user"."id",
      "username"."name"
    FROM "meetingsGuests"
      JOIN "meetings" ON "meetingsGuests"."idMeeting" = "meetings"."id"
      JOIN "users" ON "meetingsGuests"."idGuest" = "users"."id"
    WHERE "meeting"."id" = $1;
    RETURN dbworkers;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_getallworkers(integer, refcursor)
      OWNER TO postgres;
  `;

const fnMeetingGetParticipants = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_getparticipants(
    id integer,
    dbworkers refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbworkers FOR SELECT users."id",
      users."name"
    FROM meetings
      JOIN "meetingsGuests" ON meetings."id" = "meetingsGuests"."idMeeting"
      JOIN users ON "meetingsGuests"."idGuest" = users."id"
    WHERE meetings."id" = $1;
    RETURN dbworkers;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_getparticipants(integer, refcursor)
      OWNER TO postgres;
  `;

const fnMeetingGetAbsents = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_getabsents(
    "idMeeting" integer,
    "dbworkers" refcursor)
      RETURNS refcursor
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    OPEN dbworkers FOR SELECT "user"."id",
      "username"."name"
    FROM "meetingsAbsents"
      JOIN "meetings" ON "meetingsAbsents"."idMeeting" = "meetings"."id"
      JOIN "typesOfMeetings" ON "meetings"."idTypeOfMeeting" = "typesOfMeetings"."id"
      JOIN "organization" ON "typesOfMeetings"."idOrganization" = "organization"."id"
      JOIN "organizationsMembers" ON "organization"."id" = "organizationsMembers"."idMember"
      JOIN "users" ON "organizationsMembers"."idMember" = "users"."id"
    WHERE "meeting"."id" = $1 AND "meetingsAbsents"."idAbsent"="users"."id";
    RETURN dbworkers;
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_getabsents(integer, refcursor)
      OWNER TO postgres;
  `;

const fnMeetingAddAbsent = `
  CREATE OR REPLACE FUNCTION public.fn_meeting_addabsent(
    "idMeeting" integer,
    "idWorker" uuid)
      RETURNS VOID
      LANGUAGE 'plpgsql'
      
  AS $BODY$
  BEGIN
    INSERT INTO "meetingsAbsences" ("idMeeting", "idAbsent") VALUES ($1,$2);
    EXCEPTION WHEN OTHERS THEN
      RAISE NOTICE 'Something went wrong';
  END;
  $BODY$;

  ALTER FUNCTION public.fn_meeting_addabsent(integer, uuid)
      OWNER TO postgres;
  `;

export const createFunctions = async () => {
  try {
    const [userGetInfoExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_user_getinfo'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !userGetInfoExists.exists && (await sequelize.query(fnUserGetInfo));

    const [orgGetWorkersExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_organization_getworkers'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !orgGetWorkersExists.exists && (await sequelize.query(fnOrgGetWorkers));

    const [tomGetInfoExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_tom_getinfo'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !tomGetInfoExists.exists && (await sequelize.query(fnToMGetInfo));

    const [orgGetToMsExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_organization_gettoms'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !orgGetToMsExists.exists && (await sequelize.query(fnOrgGetToMs));

    const [orgGetInfoExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_organization_getinfo'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !orgGetInfoExists.exists && (await sequelize.query(fnOrgGetInfo));

    const [meetingGetInfoExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_getinfo'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetingGetInfoExists.exists && (await sequelize.query(fnMeetingGetInfo));

    const [meetAddWorkerExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_addworker'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetAddWorkerExists.exists && (await sequelize.query(fnMeetingAddWorker));

    const [meetGetAllWorkersExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_getallworkers'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetGetAllWorkersExists.exists &&
      (await sequelize.query(fnMeetingGetAllWorkers));

    const [meetGetParticipantsExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_getparticipants'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetGetParticipantsExists.exists &&
      (await sequelize.query(fnMeetingGetParticipants));

    const [meetGetAbsentsExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_getabsents'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetGetAbsentsExists.exists &&
      (await sequelize.query(fnMeetingGetAbsents));

    const [meetAddAbsentExists] = await sequelize.query(
      `
      SELECT EXISTS (
        SELECT 1
        FROM pg_proc
        WHERE proname = 'fn_meeting_addabsent'
      )
      `,
      { type: QueryTypes.SELECT }
    );

    !meetAddAbsentExists.exists && (await sequelize.query(fnMeetingAddAbsent));
  } catch (error) {
    console.log(picocolors.red(picocolors.bold('ERROR: ')), error);
  }
};
